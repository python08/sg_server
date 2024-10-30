import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import { FilterQuery } from "mongoose";
import { signJwt } from "../utils/jwt.utils";

export async function createUser(input: UserInput) {
  try {
    // FP feature to implement to add multiple super-admin
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return await UserModel.findOne(query).lean();
}

export const requestPasswordReset = async (email: string) => {
  // Check if the user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }

  // Generate a reset token
  const resetToken = signJwt(
    { id: user._id },
    {
      expiresIn: "1h", // Token expires in 1 hour
    }
  );

  // Set the token and expiration in the database
  const { createHash } = require("crypto");
  user.passwordResetToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration
  await user.save();
  return { user, resetToken };
};

export const resetPassword = async (password: string, token: string) => {
  // Hash the token
  const { createHash } = require("crypto");
  const hashedToken = createHash("sha256").update(token).digest("hex");
  // Find the user by the hashed token and check if the token is still valid
  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, // Check if the token has not expired
  });
  if (!user) {
    return false;
  }
  // Set the new password
  user.password = password;
  // Clear the reset token and expiration from the database
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();
  return user;
};

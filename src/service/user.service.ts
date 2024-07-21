import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import { FilterQuery } from "mongoose";

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

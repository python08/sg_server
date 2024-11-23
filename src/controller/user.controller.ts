import { Request, Response } from "express";
import logger from "../utils/logger";
import {
  createUser,
  requestPasswordReset,
  resetPassword,
} from "../service/user.service";
import { CreateUserInput, UserResetTokenSchema } from "../schema/user.schema";
import { omit } from "lodash";
import { sendEmail } from "../utils/aws-ses";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    // FP make role dynamic
    const user = await createUser({ ...req.body, role: "admin" });
    return res.send(omit(user, "password"));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send({
      message: "email id already exist.",
    });
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(omit(res.locals.user, "password"));
}

export async function requestPasswordResetHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  console.log("origin: ", process.env.ORIGIN);
  console.log("SES_EMAIL_SOURCE: ", process.env.SES_EMAIL_SOURCE);
  const { email } = req.body;
  const userDetails = await requestPasswordReset(email);
  if (userDetails) {
    // Send email with reset link
    const resetUrl = `${process.env.ORIGIN}/reset-password?email=${userDetails.user.email}&token=${
      userDetails.resetToken
    }`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of a password.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;
    try {
      // email source and destination same due to aws ses sandbox
      const response = await sendEmail(process.env.SES_EMAIL_SOURCE, "Password Reset", message);
      console.log(response)
      return res.status(200).json({ message: "Password reset link sent!" });
    } catch (error: any) {
      logger.error(error);
      userDetails.user.passwordResetToken = null;
      userDetails.user.passwordResetExpires = null;
      await userDetails.user.save();
      return res.status(500).json({ message: "Error sending email" });
    }
  }
  return res.status(404).json({ message: "User not found" });
}

export async function resetPasswordHandler(
  req: Request<UserResetTokenSchema["params"], {}, CreateUserInput["body"]>,
  res: Response
) {
  const { token } = req.params;
  const { password } = req.body;
  const userDetails = await resetPassword(password, token);
  if (userDetails) {
    return res.status(200).json({ message: "Password reset successfully!" });
  }
  return res.status(400).json({ message: "Token is invalid or has expired" });
}
import { TypeOf, date, object, string } from "zod";

export const createUserScehma = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Please enter minimum 6 character password"),
    passwordConfirmation: string({
      required_error: "Please confirm password",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Please enter valid email"),
    passwordResetToken: string().nullable(),
    passwordResetExpires: date().nullable(),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password did not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserScehma>;

export const params = {
  params: object({
    token: string({ required_error: "Token required" }),
  }),
};

export const userResetTokenSchema = object({
  ...params,
});

export type UserResetTokenSchema = TypeOf<typeof userResetTokenSchema>;

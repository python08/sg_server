import { TypeOf, object, string } from "zod";

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
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password did not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserScehma>;

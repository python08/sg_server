import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser({...req.body, role: "admin"});
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

import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import {
  createSession,
  findSessions,
  updateSessions,
} from "../service/session.service";
import { createAccessToken, signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  // Validate user password
  const user: any = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send({
      message: "Invalid email or password.",
    });
  }

  // Create session
  const session = await createSession(user._id, req.get("user-agent") || "");
  // Create an access token
  const accessToken = createAccessToken({ user, session });
  // Create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: process.env.REFRESH_TOKEN_TTL,
    }
  );

  // set accessToken in cookie
  res.cookie("accessToken", accessToken, {
    maxAge: 900000, //15min
    httpOnly: true,
    domain: process.env.DOMAIN,
    path: "/",
    sameSite: "strict",
    secure: !(process.env.NODE_ENV === "development"), // change this to true for https security
  });

  // set refreshToken in cookie
  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, //15min
    httpOnly: true,
    domain: process.env.DOMAIN,
    path: "/",
    sameSite: "strict",
    secure: !(process.env.NODE_ENV === "development"), // change this to true for https security
  });

  // return access and refresh token
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSessions({ _id: sessionId }, { valid: false });
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

// FP
// https://chatgpt.com/c/695e59b6-1680-8329-9146-0b92c730a752
export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    get(req, "cookies.accessToken") ||
    get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  const refreshToken =
    get(req, "cookies.refreshToken") || get(req, "headers.x-refresh", "");

  // 1️⃣ Try access token first
  if (accessToken) {
    const { decoded, expired } = verifyJwt(accessToken);

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }

    // expired access token → try refresh
    if (!expired) {
      return next();
    }
  }

  // 2️⃣ Try refresh token
  if (!refreshToken || typeof refreshToken !== "string") {
    return next();
  }

  const newAccessToken = await reIssueAccessToken({ refreshToken });

  if (!newAccessToken) {
    return next();
  }

  // 3️⃣ Set new access token
  res.setHeader("x-access-token", newAccessToken);
  res.cookie("accessToken", newAccessToken, {
    maxAge: 15 * 60 * 1000, // 15 mins
    httpOnly: true,
    domain: process.env.DOMAIN,
    path: "/",
    sameSite: "lax", // VF
    secure: process.env.NODE_ENV === "production",
  });

  const { decoded } = verifyJwt(newAccessToken);

  if (decoded) {
    // res.locals is an object provided by Express that exists for one single request-response cycle.
    // Definition:
    // res.locals is a temporary storage area where you can keep data and share it between middlewares and route handlers.
    res.locals.user = decoded;
  }

  return next();
};

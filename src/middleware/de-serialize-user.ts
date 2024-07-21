import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

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
  // if no access token found
  // check for refresh token
  if (!accessToken) {
    // refresh token present assign new access token
    if (refreshToken && typeof refreshToken === "string") {
      const newAccessToken = await reIssueAccessToken({ refreshToken });

      if (newAccessToken && typeof newAccessToken === "string") {
        res.setHeader("x-access-token", newAccessToken);
        // set accessToken in cookie
        res.cookie("accessToken", newAccessToken, {
          maxAge: 900000, //15min
          httpOnly: true,
          domain: process.env.DOMAIN,
          path: "/",
          sameSite: "strict",
          secure: !(process.env.NODE_ENV === "development"),
        });

        const result = verifyJwt(newAccessToken);

        res.locals.user = result.decoded;

        return next();
      }
    } else {
      return next();
    }
  } else {
    const { decoded } = verifyJwt(accessToken);

    // if there is ? then decode access token and assign to user
    if (decoded) {
      res.locals.user = decoded;
      return next();
    }
  }

  return next();
};

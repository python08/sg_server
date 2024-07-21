import jwt from "jsonwebtoken";

export function signJwt(object: Object, option?: jwt.SignOptions | undefined) {
  return jwt.sign(object, process.env.PRIVATE_KEY, {
    ...(option && option),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.PUBLIC_KEY);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}

export function createAccessToken({ user, session }: any) {
  return signJwt(
    { ...user, session: session._id },
    {
      expiresIn: process.env.ACCESS_TOKEN_TTL, // 15min
    }
  );
}

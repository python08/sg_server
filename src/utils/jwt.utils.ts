import jwt from "jsonwebtoken";

export function signJwt(object: Object, option?: jwt.SignOptions | undefined) {
  return jwt.sign({ ...object, buildVersion: process.env.BUILD_VERSION, }, process.env.PRIVATE_KEY, {
    ...(option && option),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded: any = jwt.verify(token, process.env.PUBLIC_KEY); // find proper type FP

    if (decoded.buildVersion !== process.env.BUILD_VERSION) {
      throw new Error('jwt expired');
    }
    
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

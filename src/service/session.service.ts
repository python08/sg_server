import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionSchema } from "../models/session.model";
import { createAccessToken, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  try {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findSessions(query: FilterQuery<SessionSchema>) {
  return SessionModel.find(query).lean();
}

export async function updateSessions(
  query: FilterQuery<SessionSchema>,
  update: UpdateQuery<SessionSchema>
) {
  return SessionModel.updateOne(query, update).lean();
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);
  const sessionId = get(decoded, "session");
  if (!decoded || !sessionId) {
    return false;
  }
  const session = await SessionModel.findById(sessionId);

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) {
    return false;
  }

  return createAccessToken({ user, session });
}

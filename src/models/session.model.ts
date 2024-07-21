import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionInput {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
}

export interface SessionSchema extends SessionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<SessionSchema>("session", sessionSchema);

export default SessionModel;

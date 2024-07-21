import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface UpdatesInput {
  updateTitle: String;
  updateDescription: String;
  user: UserDocument["_id"];
}

export interface UpdatesDocument extends UpdatesInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const updatesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    updateTitle: { type: String, required: true },
    updateDescription: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UpdatesModel = mongoose.model<UpdatesDocument>("updates", updatesSchema);

export default UpdatesModel;

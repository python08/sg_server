import mongoose from "mongoose";

export interface FestivalInput {
  name: string;
}

export interface FestivalDocument extends FestivalInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const festivalSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

const FestivalModel = mongoose.model<FestivalDocument>(
  "festivals",
  festivalSchema
);

export default FestivalModel;

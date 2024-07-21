import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ProductInput {
  name: String;
  link: String;
  title: String;
  description: String;
  brief: String;
  price: Number;
  category: String;
  user: UserDocument["_id"];
  // FP add this later
  festivalName: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    festivalName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "festivals",
    },
    name: { type: String, required: true },
    link: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    brief: { type: String, required: true },
    price: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    isActive: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("products", productSchema);

export default ProductModel;

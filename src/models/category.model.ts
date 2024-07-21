import mongoose from "mongoose";

export interface CategoryInput {
  name: string;
}

export interface CategoryDocument extends CategoryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<CategoryDocument>(
  "categories",
  categorySchema
);

export default CategoryModel;

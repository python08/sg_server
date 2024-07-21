import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CategoryModel, {
  CategoryDocument,
  CategoryInput,
} from "../models/category.model";

export async function createCategory(input: CategoryInput) {
  return CategoryModel.create(input);
}

export async function findCategory(
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true }
) {
  return CategoryModel.findOne(query, {}, options);
}

export async function getAllCategory() {
  return CategoryModel.find();
}

export async function findAndUpdateCategory(
  query: FilterQuery<CategoryDocument>,
  update: UpdateQuery<CategoryDocument>,
  options: QueryOptions
) {
  return CategoryModel.findOneAndUpdate(query, update, options);
}

export async function deleteCategory(query: FilterQuery<CategoryDocument>) {
  return CategoryModel.deleteOne(query);
}

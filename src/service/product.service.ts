import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, {
  ProductDocument,
  ProductInput,
} from "../models/product.model";
import {
  getActiveProductLookUp,
  getAllProductsLookUp,
  getProductByIdLookUp,
} from "../db/lookup";

export async function createProduct(input: ProductInput) {
  return ProductModel.create(input);
}

export async function findProduct(query: FilterQuery<ProductDocument>) {
  // return ProductModel.findOne(query, {}, options);
  return ProductModel.aggregate(getProductByIdLookUp(query._id));
}

export async function getAllProduct() {
  return ProductModel.aggregate(getAllProductsLookUp);
}

export async function getActiveProduct() {
  return ProductModel.aggregate(getActiveProductLookUp());
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query._id);
}

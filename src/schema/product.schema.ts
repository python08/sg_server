import { TypeOf, object, string, z } from "zod";

export const payload = {
  body: object({
    user: string({ required_error: "User is required" }),
    festivalName: string({ required_error: "Festival name is required" }),
    name: string({ required_error: "Name is required" }).max(
      30,
      "Name should be maximum 30 character long"
    ),
    title: string({ required_error: "Title is required" }).max(
      30,
      "Title should be maximum 30 character long"
    ),
    description: string({ required_error: "Description is required" }).max(
      101,
      "Description should be maximum 101 character long"
    ),
    brief: string({ required_error: "Brief is required" }).max(
      300,
      "Brief should be maximum 300 character long"
    ),
    price: string({ required_error: "Price is required" }),
    category: string({ required_error: "Category is required" }),
    image: z.any(), // FP find type check for file object
  }),
};

export const params = {
  params: object({
    productId: string({ required_error: "Product ID is required" }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;

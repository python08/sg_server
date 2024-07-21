export const getAllProductsLookUp = [
  {
    $lookup: {
      from: "festivals",
      localField: "festivalName",
      foreignField: "_id",
      as: "festivalName",
    },
  },
  {
    $unwind: {
      path: "$festivalName",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: "categories",
      localField: "category",
      foreignField: "_id",
      as: "category",
    },
  },
  {
    $unwind: {
      path: "$category",
      preserveNullAndEmptyArrays: true,
    },
  },
];

export const getProductByIdLookUp = (productId: string) => [
  {
    $match: { _id: productId },
  },
  ...getAllProductsLookUp,
];

export const getActiveProductLookUp = () => [
  {
    $match: { isActive: true },
  },
  ...getAllProductsLookUp,
];

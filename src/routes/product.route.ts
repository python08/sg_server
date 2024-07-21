import { Express } from "express";
import { requireUser } from "../middleware/require-user";
import validateResource from "../middleware/validate-resource";
import {
  createProductHandler,
  deleteProductHandler,
  getActiveProductHandler,
  getAllProductHandler,
  getProductDetailsHandler,
  updateProductHandler,
  uploadProductImageHandler,
} from "../controller/product.controller";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../schema/product.schema";

const multer = require("multer");

// why?
// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export function productRoutes(app: Express) {
  app.post(
    "/api/product",
    [
      requireUser,
      upload.single("image"),
      validateResource(createProductSchema),
    ],
    createProductHandler
  );

  app.put(
    "/api/product/:productId",
    [
      requireUser,
      upload.single("image"),
      validateResource(updateProductSchema),
    ],
    updateProductHandler
  );

  // product-image
  app.post(
    "/api/upload-product-image",
    [requireUser, upload.single("image")],
    uploadProductImageHandler
  );

  app.get(
    "/api/product/:productId",
    [validateResource(getProductSchema)],
    getProductDetailsHandler
  );

  app.get("/api/all-products", [requireUser], getAllProductHandler);

  // active products, user login not required
  app.get("/api/products", getActiveProductHandler);

  app.delete(
    "/api/product/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}

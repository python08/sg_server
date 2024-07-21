import { Express } from "express";
import { getAllCategoryHandler } from "../controller/category.controller";

export function categoryRoutes(app: Express) {
  app.get("/api/all-categories", getAllCategoryHandler);
}

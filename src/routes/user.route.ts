import { Express } from "express";
import { requireUser } from "../middleware/require-user";
import validateResource from "../middleware/validate-resource";
import { createUserScehma } from "../schema/user.schema";
import {
  createUserHandler,
  getCurrentUserHandler,
} from "../controller/user.controller";

export function userRoutes(app: Express) {
  app.post("/api/users", validateResource(createUserScehma), createUserHandler);
  app.get("/api/me", requireUser, getCurrentUserHandler);
}

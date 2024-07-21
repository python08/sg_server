import { Express } from "express";
import { requireUser } from "../middleware/require-user";
import validateResource from "../middleware/validate-resource";
import { createSessionSchema } from "../schema/session.schema";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionHandler,
} from "../controller/session.controller";

export function sessionRoutes(app: Express) {
  // session
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.delete("/api/sessions", requireUser, deleteUserSessionHandler);
}

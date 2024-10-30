import { Express } from "express";
import { requireUser } from "../middleware/require-user";
import validateResource from "../middleware/validate-resource";
import { createUserScehma, userResetTokenSchema } from "../schema/user.schema";
import {
  createUserHandler,
  getCurrentUserHandler,
  requestPasswordResetHandler,
  resetPasswordHandler,
} from "../controller/user.controller";

export function userRoutes(app: Express) {
  app.post("/api/users", validateResource(createUserScehma), createUserHandler);
  app.get("/api/me", requireUser, getCurrentUserHandler);
  app.post("/api/forgot-password", requestPasswordResetHandler);
  app.put(
    "/api/auth/reset-password/:token",
    [validateResource(userResetTokenSchema)],
    resetPasswordHandler
  );
}

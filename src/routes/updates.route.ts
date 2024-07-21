import { Express } from "express";
import { getAllUpdatesHandler } from "../controller/updates.controller";

export function updatesRoutes(app: Express) {
  app.get("/api/updates", [], getAllUpdatesHandler);
}

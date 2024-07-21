import { Express } from "express";
import { getAllFestivalHandler } from "../controller/festival.controller";

export function festivalRoutes(app: Express) {
  app.get("/api/all-festivals", getAllFestivalHandler);
}

import { Request, Response } from "express";
import logger from "../utils/logger";
import { getAllFestival } from "../service/festival.service";

export async function getAllFestivalHandler(req: Request, res: Response) {
  try {
    const Categories = await getAllFestival();

    if (!Categories) {
      return res.sendStatus(404);
    }

    return res.send(Categories);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

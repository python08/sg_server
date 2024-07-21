import { Request, Response } from "express";
import logger from "../utils/logger";
import { getAllCategory } from "../service/category.service";

export async function getAllCategoryHandler(req: Request, res: Response) {
  try {
    const Categories = await getAllCategory();

    if (!Categories) {
      return res.sendStatus(404);
    }

    return res.send(Categories);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

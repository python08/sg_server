import { Request, Response } from "express";
import logger from "../utils/logger";
import { findUpdatesById, getAllUpdates } from "../service/updates.service";
import { GetUpdatesInput } from "../schema/updates.schema";

// FP integrate later, POST PUT DELETE
export async function findUpdatesHandler(
  req: Request<GetUpdatesInput["params"]>,
  res: Response
) {
  try {
    const updatesId = req.params.updatesId;

    const update = await findUpdatesById({ _id: updatesId });

    if (!update) {
      return res.sendStatus(404);
    }

    return res.send(update);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getAllUpdatesHandler(req: Request, res: Response) {
  try {
    const updates = await getAllUpdates();

    if (!updates) {
      return res.sendStatus(404);
    }

    return res.send(updates);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

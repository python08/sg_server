import { QueryOptions } from "mongoose";
import { FilterQuery } from "mongoose";
import UpdatesModel, { UpdatesDocument } from "../models/updates.model";

export async function findUpdatesById(
  query: FilterQuery<UpdatesDocument>,
  options: QueryOptions = { lean: true }
) {
  return UpdatesModel.findOne(query, {}, options);
}

export async function getAllUpdates() {
  return UpdatesModel.find();
}

import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import FestivalModel, {
  FestivalDocument,
  FestivalInput,
} from "../models/festival.model";

export async function createFestival(input: FestivalInput) {
  return FestivalModel.create(input);
}

export async function findFestival(
  query: FilterQuery<FestivalDocument>,
  options: QueryOptions = { lean: true }
) {
  return FestivalModel.findOne(query, {}, options);
}

export async function getAllFestival() {
  return FestivalModel.find();
}

export async function findAndUpdateFestival(
  query: FilterQuery<FestivalDocument>,
  update: UpdateQuery<FestivalDocument>,
  options: QueryOptions
) {
  return FestivalModel.findOneAndUpdate(query, update, options);
}

export async function deleteFestival(query: FilterQuery<FestivalDocument>) {
  return FestivalModel.deleteOne(query);
}

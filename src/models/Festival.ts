import mongoose from "mongoose";

const festivalSchema = new mongoose.Schema({
  id: Number,
  name: String,
  link: String
});

const FestivalModel = mongoose.model("festivals", festivalSchema);

module.exports = FestivalModel;

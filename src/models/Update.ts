import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
  id: Number,
  updateTitle: String,
  updateDescription: String,
  image: String,
});

const UpdateModel = mongoose.model("updates", updateSchema);

module.exports = UpdateModel;

import mongoose from "mongoose";

const welcomeVideoSchema = new mongoose.Schema({
  id: Number,
  occassion: String,
  link: String,
});

const WelcomeVideoModel = mongoose.model("welcomeVideo", welcomeVideoSchema);

module.exports = WelcomeVideoModel;

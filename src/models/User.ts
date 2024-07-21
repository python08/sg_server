import mongoose from "mongoose";

export type UserModel = {
  id: number;
  username: string;
  email: string;
  number: string;
  role: string;
};

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: String,
  number: String,
  role: String,
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;

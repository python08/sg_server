import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  link: String,
  title: String,
  description: String,
  brief: String,
  price: String,
  festivalName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "festivals"
  },
  category: String
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;

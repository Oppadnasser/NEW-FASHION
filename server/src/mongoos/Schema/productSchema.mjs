import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: mongoose.Schema.Types.String,
  price: mongoose.Schema.Types.Number,
  description: {
    type: mongoose.Schema.Types.String,
    length: { max: 500 },
  },
  photo: mongoose.Schema.Types.String,
  evaluation: mongoose.Schema.Types.Number,
  evaluatorNumber: mongoose.Schema.Types.Number,
  quantity: mongoose.Schema.Types.Number,
  companyName: mongoose.Schema.Types.String,
  brand: mongoose.Schema.Types.String,
  shippingExpenses: mongoose.Schema.Types.Number,
  logo: mongoose.Schema.Types.String,
  userOwner: mongoose.Schema.Types.String,
});

export const Product = mongoose.model("Products", productSchema);

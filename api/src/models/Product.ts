import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    desc: {
      short: { type: String, trim: true, required: true },
      long: { type: String, trim: true },
    },
    brand: { type: String, trim: true, required: true },
    img: { type: String, required: true, trim: true },
    categories: [{ type: String, required: true, trim: true, lowercase: true }],
    sizes: [{ type: String, required: true, trim: true, lowercase: true }],
    colors: [{ type: String, required: true, trim: true, lowercase: true }],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Product", productSchema);

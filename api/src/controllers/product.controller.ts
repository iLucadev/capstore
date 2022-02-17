import { Response, RequestHandler } from "express";
import Product from "../models/Product";

//GET ALL
export const getProducts: RequestHandler = async (req, res) => {
  try {
    //Look for all documents with the model and return them.
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    //If something goes wrong, just return error message.
    res.json(error);
  }
};
//GET ONE BY ID
export const getProduct: RequestHandler = async (req, res) => {
  //Making a request for a product by id.
  const product = await Product.findById(req.params.id);
  //We ask if the product doesn't exists. If true: 404, if not, return the product.
  return !product ? res.status(404) : res.json(product);
};
//CREATE
export const createProduct: RequestHandler = async (req, res) => {
  //We ensure the product doesn't already exists in the db.
  const created = await Product.findById(req.params.id);
  if (created) {
    return res.status(303).json({ message: "Product already exists" });
  }
  //If not, then create the product object
  const product = new Product(req.body);
  const savedProduct = await product.save();
  res.json(savedProduct);
};
//DELETE
export const deleteProduct: RequestHandler = async (req, res) => {
  //Looking by id.
  const product = await Product.findByIdAndDelete(req.params.id);
  //Asking if product wasn't founded. If true, return 404; if exists, return deleted product.
  return !product
    ? res.status(404).json({ message: "Product not found" })
    : res.json(product);
};
//UPDATE
export const updateProduct: RequestHandler = async (req, res) => {
  //Looking for the product in db and getting the update data.
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  //Asking if product wasn't founded. If true, return 404; if exists, return updated product.
  return !updatedProduct
    ? res.status(204).json({ message: "Product not found" })
    : res.json(updatedProduct);
};

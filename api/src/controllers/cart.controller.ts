import { Response, RequestHandler } from "express";
import Cart from "../models/Cart";

//GET ALL
export const getCarts: RequestHandler = async (req, res) => {
  try {
    //Look for all documents with the model and return them.
    const carts = await Cart.find();
    return res.json(carts);
  } catch (error) {
    //If something goes wrong, just return error message.
    res.json(error);
  }
};
//GET ONE BY ID
export const getCart: RequestHandler = async (req, res) => {
  //Making a request for a cart by id.
  const cart = await Cart.findById(req.params.id);
  //We ask if the cart doesn't exists. If true: 404, if not, return the cart.
  return !cart ? res.status(404) : res.json(cart);
};
//CREATE
export const createCart: RequestHandler = async (req, res) => {
  //We ensure the cart doesn't already exists in the db.
  const created = await Cart.findById(req.params.id);
  if (created) {
    return res.status(303).json({ message: "Cart already exists" });
  }
  //If not, then we save the cart.
  const cart = new Cart(req.body);
  const savedCart = await cart.save();
  res.json(savedCart);
};
//DELETE
export const deleteCart: RequestHandler = async (req, res) => {
  //Looking by id.
  const cart = await Cart.findByIdAndDelete(req.params.id);
  //Asking if cart wasn't founded. If true, return 404; if exists, return deleted cart.
  return !cart
    ? res.status(404).json({ message: "Cart not found" })
    : res.json(cart);
};
//UPDATE
export const updateCart: RequestHandler = async (req, res) => {
  //Looking for the cart in db and getting the update data.
  const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  //Asking if cart wasn't founded. If true, return 404; if exists, return updated cart.
  return !updatedCart
    ? res.status(204).json({ message: "Cart not found" })
    : res.json(updatedCart);
};

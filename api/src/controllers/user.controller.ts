import { Request, RequestHandler } from "express";
import User, { IUser } from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import config from "../config";

const createToken = (user: IUser) => {
  return jwt.sign({ id: user.id, email: user.email }, config.JWTSECRET, {
    expiresIn: 86400,
  });
};
//CREATE USER
export const createUser: RequestHandler = async (req, res) => {
  //If the request does not provide an email and password we ask for them
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Provide your email and password" });
  }
  //We ensure the user doesn't already exists
  const registered = await User.findOne({ email: req.body.email });
  if (registered) {
    return res.status(400).json({ message: "The user already exists" });
  }
  //If not, then we create the user
  const { username, email, password, roles } = req.body;
  let givenRoles = roles;
  const user = new User(req.body);
  //Adding the role
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    user.roles = foundRoles.map((role) => {
      if ((givenRoles = role.name)) return role._id;
    });
  }
  //saving the user in the database
  const newUser = await user.save();
  return res.status(201).json(newUser);
};
//GET ALL
export const getUsers: RequestHandler = async (req, res) => {
  try {
    //Look for all documents with the model and return them.
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    //If something goes wrong, just return error message.
    res.json(error);
  }
};
//GET ONE BY ID
export const getUser: RequestHandler = async (req, res) => {
  //Making a request for a product by id.
  const user = await User.findById(req.params.id);
  //We ask if the product doesn't exists. If true: 404, if not, return the product.
  return !user ? res.status(404) : res.json(user);
};
//DELETE
export const deleteUser: RequestHandler = async (req, res) => {
  //Looking by id.
  const user = await User.findByIdAndDelete(req.params.id);
  //Asking if product wasn't founded. If true, return 404; if exists, return deleted product.
  return !user
    ? res.status(404).json({ message: "User not found" })
    : res.json(user);
};
//UPDATE
export const updateUser: RequestHandler = async (req, res) => {
  //Looking for the product in db and getting the update data.
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  //Asking if product wasn't founded. If true, return 404; if exists, return updated product.
  return !updatedUser
    ? res.status(204).json({ message: "User not found" })
    : res.json(updatedUser);
};

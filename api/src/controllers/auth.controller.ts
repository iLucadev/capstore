import { Request, RequestHandler } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

const createToken = (user: IUser) => {
  return jwt.sign({ id: user.id, email: user.email }, config.JWTSECRET, {
    expiresIn: 86400, //24 hours
  });
};
//SIGN UP
export const signUp: RequestHandler = async (req, res) => {
  //If the request does not provide an email and password we ask for them
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Provide your email and password" });
  }
  //We ensure the user doesn't already exists
  const registered = await User.findOne({ email: req.body.email });
  if (registered) {
    return res.status(400).json({ message: "The user already exists" });
  }
  //Creating the user object
  const user = new User(req.body);
  //Giving the user role for the registered user
  if (!req.body.roles) {
    const role = await Role.findOne({ name: "user" });
    user.roles = [role._id];
  }
  //Saving the user in the database
  const newUser = await user.save();
  return res.status(201).json(newUser);
};
//SIGN IN
export const signIn: RequestHandler = async (req, res) => {
  //If the request does not provide an email and password we ask for them
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Provide your email and password" });
  }
  //We ensure the user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "The user doesn't exists" });
  }
  //If exists, we compare passwords. If they match, create the token
  const isMatch = await user.comparePassword(req.body.password);
  return isMatch
    ? res.status(400).json({ token: createToken(user) })
    : res.status(400).json({
        message: "Incorrect email or password",
      });
};

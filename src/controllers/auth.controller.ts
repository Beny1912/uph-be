import { Request, Response } from "express";

import User, { IUser } from "../models/user.model";
import { signinValidation, signupValidation } from "../validations";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  // Validation
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).json({ message: error.message });

  // Email Validation
  const emailExists = await User.findOne({ email: req.body.email.toString() });
  if (emailExists)
    return res.status(400).json({ message: "Email already exists" });

  // Saving a new User
  try {
    const newUser: IUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    newUser.password = await newUser.encryptPassword(newUser.password);
    const savedUser = await newUser.save();

    const token: string = jwt.sign(
      { _id: savedUser._id },
      process.env["TOKEN_SECRET"] || "uphold",
      {
        expiresIn: "10h",
      }
    );
    //No show password in response
    delete savedUser.password;
    res.header("auth-token", token).json(savedUser);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const signin = async (req: Request, res: Response) => {
  // Validate body
  const { error } = signinValidation(req.body);
  // Response error if validate ko
  if (error) return res.status(400).json({ message: error.message });
  // Validate email registered
  const user = await User.findOne({ email: req.body.email.toString() });
  // Response error no registered
  if (!user)
    return res.status(400).json({ message: "Email or Password is wrong" });
  // Validate password
  const correctPassword = await user.validatePassword(req.body.password);
  // Response error
  if (!correctPassword)
    return res.status(400).json({ message: "Invalid Password" });

  // Create a Token
  const token: string = jwt.sign(
    { _id: user._id },
    process.env["TOKEN_SECRET"] || "uphold"
  );
  res.header("auth-token", token).json({ token: token });
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id, { password: 0 });
  if (!user) {
    return res.status(404).json({ message: "No User found" });
  }
  res.json(user);
};

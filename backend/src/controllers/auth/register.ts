import { RequestHandler } from "express";
import { UserModel } from "../../database/schema";

export const register: RequestHandler = async (req, res) => {
  const { username, password, email, role } = req.body;

  const isUserNameEx = await UserModel.findOne({ username });
  if (isUserNameEx)
    return res.status(404).json({ message: "Username already exists" });

  const isUserEmailEx = await UserModel.findOne({ email });
  if (isUserEmailEx)
    return res.status(404).json({ message: "Email already exists" });

  const user = await UserModel.create({
    username,
    password,
    email,
    role,
  });

  res.status(200).json({ user });
};

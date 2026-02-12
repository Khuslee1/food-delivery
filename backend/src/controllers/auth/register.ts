import { RequestHandler } from "express";
import { UserModel } from "../../database/schema";

export const register: RequestHandler = async (req, res) => {
  const { password, email, role } = req.body;

  const isUserEmailEx = await UserModel.findOne({ email });
  if (isUserEmailEx)
    return res.status(404).json({ message: "Email already exists" });
  console.log("===============");

  const user = await UserModel.create({
    password,
    email,
    role,
  });

  console.log("===========", user);

  res.status(200).json({ user });
};

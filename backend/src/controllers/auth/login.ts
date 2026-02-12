import { RequestHandler } from "express";
import { UserModel } from "../../database/schema";
import jwt from "jsonwebtoken";

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const { password: UserPassword, ...rest } = user.toObject();

  if (UserPassword !== password)
    return res.status(401).json({ message: "Username or password wrong" });

  const accessToken = jwt.sign({ user: rest }, "67");
  return res.status(200).json({
    user: rest,
    accessToken,
    message: "Access proved",
  });
};

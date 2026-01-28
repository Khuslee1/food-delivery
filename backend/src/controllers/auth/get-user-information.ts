import { RequestHandler } from "express";
import { UserModel } from "../../database/schema";

export const UserInformation: RequestHandler = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const newUser = await UserModel.findById(userId).select("-password");
  res.status(200).json({ newUser });
};

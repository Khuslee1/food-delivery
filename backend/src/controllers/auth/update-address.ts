import { RequestHandler } from "express";
import { UserModel } from "../../database/schema";

export const updateAddress: RequestHandler = async (req, res) => {
  const { address } = req.body;
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { address: address },
    { new: true },
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    user: updatedUser,
  });
};

import { RequestHandler } from "express";
import { OrderModel } from "../../database/schema";

export const getUserOrders: RequestHandler = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const orders = await OrderModel.find({ userId })
    .populate("orderItems.foodId")
    .populate("userId");

  res.status(200).json(orders);
};

import { RequestHandler } from "express";
import { OrderModel } from "../../database/schema";

export const getOrders: RequestHandler = async (req, res) => {
  const orders = await OrderModel.find({})
    .populate("orderItems.foodId")
    .populate("userId", "-password")
    .skip(10)
    .limit(10);
  res.status(201).json(orders);
};

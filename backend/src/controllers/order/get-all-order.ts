import { RequestHandler } from "express";
import { OrderModel } from "../../database/schema";

export const getOrders: RequestHandler = async (req, res) => {
  const { gt, lt } = req.query;

  const filter: any = {};

  if (gt || lt) {
    filter.createdAt = {};
    if (gt) filter.createdAt.$gte = new Date(gt as string);
    if (lt) filter.createdAt.$lte = new Date(lt as string);
  }

  const orders = await OrderModel.find(filter)
    .populate("orderItems.foodId")
    .populate("userId", "-password");

  res.status(200).json(orders);
};

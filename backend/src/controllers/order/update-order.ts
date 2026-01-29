import { RequestHandler } from "express";
import { OrderModel } from "../../database/schema";

export const updateStatus: RequestHandler = async (req, res) => {
  const { orderIds, status } = req.body;

  if (!Array.isArray(orderIds) || orderIds.length === 0) {
    return res.status(400).json({ message: "orderIds must be an array" });
  }

  const result = await OrderModel.updateMany(
    { _id: { $in: orderIds } },
    { $set: { status } },
  );

  res.status(200).json({
    matched: result.matchedCount,
    modified: result.modifiedCount,
  });
};

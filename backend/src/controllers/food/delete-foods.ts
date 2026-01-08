import { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema";

export const deleteFood: RequestHandler = async (req, res) => {
  const body = req.body;
  const foods = await FoodModel.deleteOne({ name: body.name });
  res.status(202).json(foods);
};

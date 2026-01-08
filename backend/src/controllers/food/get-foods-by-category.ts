import { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema";

export const getFoodsByCategory: RequestHandler = async (req, res) => {
  const categoryId = req.params.id;
  const foods = await FoodModel.find({
    categoryId,
  }).populate("categoryId");

  res.status(200).json(foods);
};

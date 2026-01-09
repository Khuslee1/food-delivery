import { RequestHandler } from "express";
import { CategoryModel } from "../../database/schema";

export const deleteCategory: RequestHandler = async (req, res) => {
  const body = req.body;
  const category = await CategoryModel.deleteOne({ name: body.name });
  res.status(202).json(category);
};

import { RequestHandler } from "express";
import { CategoryModel } from "../../database/schema";

export const getCategories: RequestHandler = async (req, res) => {
    const categories = await CategoryModel.find({});
    res.status(201).json(categories)
}

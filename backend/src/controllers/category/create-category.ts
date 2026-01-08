import { RequestHandler } from "express";
import { CategoryModel } from "../../database/schema";

export const createCategory: RequestHandler = async (req, res) => {const body =req.body;
    const category = await CategoryModel.create({
        name: body.name,

    });

    res.status(201).json(category)
}

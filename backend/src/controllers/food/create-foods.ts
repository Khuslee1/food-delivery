import { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema";

export const createFood: RequestHandler = async (req, res) => {const body =req.body;
    // const food = await FoodModel.create({
    //     name: body.name,
    //     price: body.price,
    //     image: body.image,
    //     ingredients: body.ingredients,
    //     categoryId: body.categoryIds,
    // });

        const food = await FoodModel.insertMany(body)
    res.status(201).json(food)
}


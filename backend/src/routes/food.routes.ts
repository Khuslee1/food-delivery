import { Router } from "express";
import { getFoods } from "../controllers/food/get-foods";
import { createFood } from "../controllers/food/create-foods";
import { deleteFood } from "../controllers/food/delete-foods";
import { getFoodsByCategory } from "../controllers/food/get-foods-by-category";
import { updateFood } from "../controllers/food/update-foods";

const FoodRouter = Router();

FoodRouter.get("/", getFoods)
  .post("/create", createFood)
  .delete("/", deleteFood)
  .get("/category/:id", getFoodsByCategory)
  .put("/:id", updateFood);

export { FoodRouter };

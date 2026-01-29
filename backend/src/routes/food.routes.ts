import { Router } from "express";
import { getFoods } from "../controllers/food/get-foods";
import { createFood } from "../controllers/food/create-foods";
import { deleteFood } from "../controllers/food/delete-foods";
import { getFoodsByCategory } from "../controllers/food/get-foods-by-category";
import { updateFood } from "../controllers/food/update-foods";
import { authMiddleware, RoleMiddleware } from "../middlewares";

const FoodRouter = Router();

FoodRouter.get("/", getFoods)
  .post("/create", RoleMiddleware, createFood)
  .delete("/", RoleMiddleware, deleteFood)
  .get("/category/:id", getFoodsByCategory)
  .put("/:id", RoleMiddleware, updateFood);

export { FoodRouter };

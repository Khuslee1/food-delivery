import { Router } from "express";

import { createCategory, getCategories } from "../controllers/category";
import { deleteCategory } from "../controllers/category/delete-category";
import { RoleMiddleware } from "../middlewares";

const CategoryRouter = Router();

CategoryRouter.get("/", getCategories)
  .post("/create", RoleMiddleware, createCategory)
  .delete("/delete", RoleMiddleware, deleteCategory);

export { CategoryRouter };

import { Router } from "express";

import { createCategory, getCategories } from "../controllers/category";
import { deleteCategory } from "../controllers/category/delete-category";

const CategoryRouter = Router();

CategoryRouter.get("/", getCategories)
  .post("/create", createCategory)
  .delete("/delete", deleteCategory);

export { CategoryRouter };

import { Router } from "express";

import { createCategory, getCategories } from "../controllers/category";

const CategoryRouter = Router();

CategoryRouter.get("/", getCategories).post("/create", createCategory);

export { CategoryRouter };

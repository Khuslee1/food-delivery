import { Router } from "express";
import { createOrder } from "../controllers/order/post-order";
import { getUserOrders } from "../controllers/order/get-order";
import { authMiddleware, RoleMiddleware } from "../middlewares";
import { getOrders } from "../controllers/order/get-all-order";
import { updateStatus } from "../controllers/order/update-order";

const OrderRouter = Router();

OrderRouter.post("/", authMiddleware, createOrder)
  .get("/", authMiddleware, getUserOrders)
  .get("/all", RoleMiddleware, authMiddleware, getOrders)
  .patch("/status", RoleMiddleware, authMiddleware, updateStatus);

export { OrderRouter };

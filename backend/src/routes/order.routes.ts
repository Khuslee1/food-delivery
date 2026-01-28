import { Router } from "express";
import { createOrder } from "../controllers/order/post-order";
import { getUserOrders } from "../controllers/order/get-order";
import { authMiddleware } from "../middlewares";
import { getOrders } from "../controllers/order/get-all-order";

const OrderRouter = Router();

OrderRouter.post("/", authMiddleware, createOrder)
  .get("/", authMiddleware, getUserOrders)
  .get("/all", authMiddleware, getOrders);

export { OrderRouter };

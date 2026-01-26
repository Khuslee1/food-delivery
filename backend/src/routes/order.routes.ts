import { Router } from "express";
import { createOrder } from "../controllers/order/post-order";
import { getUserOrders } from "../controllers/order/get-order";
import { authMiddleware } from "../middlewares";

const OrderRouter = Router();

OrderRouter.post("/", authMiddleware, createOrder).get(
  "/",
  authMiddleware,
  getUserOrders,
);

export { OrderRouter };

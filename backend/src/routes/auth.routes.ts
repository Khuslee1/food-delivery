import { Router } from "express";
import {
  getMe,
  login,
  register,
  updateAddress,
  UserInformation,
} from "../controllers/auth";
import { authMiddleware } from "../middlewares";

const AuthRouter = Router();

AuthRouter.post("/login", login)
  .post("/register", register)
  .get("/me", getMe)
  .put("/address", authMiddleware, updateAddress)
  .get("/user", authMiddleware, UserInformation);

export { AuthRouter };

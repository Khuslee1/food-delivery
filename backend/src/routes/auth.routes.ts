import { Router } from "express";
import {
  getMe,
  login,
  register,
  updateAddress,
  UserInformation,
} from "../controllers/auth";
import { authMiddleware } from "../middlewares";
import { forgotPassword } from "../controllers/auth/forgot-password";
import { verifyOTP } from "../controllers/auth/verify-otp";
import { resetPassword } from "../controllers/auth/reset-password";

const AuthRouter = Router();

AuthRouter.post("/login", login)
  .post("/register", register)
  .get("/me", getMe)
  .put("/address", authMiddleware, updateAddress)
  .get("/user", authMiddleware, UserInformation)
  .post("/forgot-password", forgotPassword)
  .post("/verify-otp", verifyOTP)
  .post("/reset-password", resetPassword);

export { AuthRouter };

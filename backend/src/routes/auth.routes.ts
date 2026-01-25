import { Router } from "express";
import { getMe, login, register } from "../controllers/auth";

const AuthRouter = Router();

AuthRouter.post("/login", login).post("/register", register).get("/me", getMe);

export { AuthRouter };

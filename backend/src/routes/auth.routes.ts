import { Router } from "express";
import { login, register } from "../controllers/auth";

const AuthRouter = Router();

AuthRouter.post("/login", login).post("/register", register);

export { AuthRouter };

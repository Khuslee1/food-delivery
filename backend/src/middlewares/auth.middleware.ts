import { RequestHandler } from "express";
import { UserModel } from "../database/schema";
import jwt from "jsonwebtoken";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ message: "Unauthorized" });

  const token = authorization.split(" ")[1] as string;

  try {
    const { user } = jwt.verify(token, "67") as {
      user: Omit<typeof UserModel, "password">;
    };
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

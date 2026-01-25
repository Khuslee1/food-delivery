import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../database/schema";

export const getMe: RequestHandler = async (req, res) => {
  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).json({ message: "Unauthorized" });

  const token = authorization.split(" ")[1] as string;

  try {
    const { user } = jwt.verify(token, "67") as {
      user: Omit<typeof UserModel, "password">;
    };

    res.status(200).json({ user });
  } catch {
    res.status(401).json({ message: "invalid token " });
  }
};

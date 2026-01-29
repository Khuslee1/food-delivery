import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const RoleMiddleware: RequestHandler = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ message: "Unauthorized" });

  const token = authorization.split(" ")[1] as string;

  try {
    const { user } = jwt.verify(token, "67") as {
      user: {
        _id: string;
        role: string;
      };
    };

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

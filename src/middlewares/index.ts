import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send("Unauthorized");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err) => {
    if (err) return res.status(403).send("Authorization failed");
    next();
  });
};

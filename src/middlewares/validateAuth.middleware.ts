import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const validateAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "invalid Token." });
  }

  token = token.split("")[1];

  jwt.verify(token, process.env.SECRETKEY!, (error, decoded: any) => {
    if (error) {
      res.status(401).json({
        message: error.message,
      });
    }

    req.user = {
      id: decoded.sub,
      is_active: decoded.is_active,
    };
    return next();
  });
};
export default validateAuthMiddleware

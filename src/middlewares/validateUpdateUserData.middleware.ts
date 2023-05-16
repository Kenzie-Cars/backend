import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const validateUpdateUserDataMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body;

  if (userData.is_active !== undefined) {
    throw new AppError("You don't have permission to update this data", 401);
  }
  if (userData.id !== undefined) {
    throw new AppError("You don't have permission to update ID field", 401);
  }
  if (userData.is_active !== undefined) {
    throw new AppError("You don't have permission to update this field", 401);
  }
  return next();
};

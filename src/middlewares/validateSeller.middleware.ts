import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entities/user.entity";

const validateSellerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Users);
  const seller = await userRepository.findOneBy({ id: req.user.id });

  if (!seller?.is_seller) {
    return res
      .status(403)
      .json({ message: "need to be a seller to access this route" });
  }

  return next();
};

export default validateSellerMiddleware
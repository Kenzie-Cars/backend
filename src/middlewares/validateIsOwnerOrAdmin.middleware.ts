import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Users } from "../entities/user.entity";
import { AppError } from "../errors";

const validateIsOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;
  const { id } = req.user;

  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

  const foundUser = await userRepository.findOneBy({ id: userId });

  if (foundUser?.id !== id) {
    throw new AppError("You can't access this data.", 403);
  }
  return next();
};

export default validateIsOwnerMiddleware;

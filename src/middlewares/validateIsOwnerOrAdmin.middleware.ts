import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entities/user.entity";
import { Repository } from "typeorm";
import { AppError } from "../errors";

const validateIsOwnerOrAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;
  const loggedUser = req.user.id;

  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

  const foundUser = await userRepository.findOneBy({ id: userId });

  if (foundUser?.id !== loggedUser || foundUser?.is_adm) {
    throw new AppError("You can't access this data.", 403);
  }
  return next();
};

export default validateIsOwnerOrAdminMiddleware;

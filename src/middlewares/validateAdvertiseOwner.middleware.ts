import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Advertisements } from "../entities/advertisement.entity";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

const validateAdvertiseOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const advertisementRepository: Repository<Advertisements> =
    AppDataSource.getRepository(Advertisements);

  const userId = req.user.id;
  const advertisement = req.params.id;

  const findAdvertise = await advertisementRepository
    .createQueryBuilder()
    .from(Advertisements, "advertisements")
    .leftJoin("advertisements.user", "user")
    .select(["advertisements", "user.id"])
    .where("advertisements.id = :id", { id: advertisement })
    .getOne();

  if (findAdvertise?.user.id !== userId) {
    throw new AppError("You don't have permission to do this", 403);
  }

  next();
};
export default validateAdvertiseOwnerMiddleware;

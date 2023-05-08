import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Users_advertisements } from "../entities/users_advertisements.entity";
import { AppError } from "../errors";

const validateCommentDeleteAdvertiseOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const commentRepository: Repository<Users_advertisements> =
    AppDataSource.getRepository(Users_advertisements);

  const commentId = req.params.id;
  const userId = req.user.id;

  const findComment = await commentRepository.findOne({
    where: { id: commentId },
    select: {
      advertisements: {
        id: true,
        user: {
          id: true,
        },
      },
      user: {
        id: true,
      },
    },
    relations: {
      advertisements: { user: true },
      user: true,
    },
  });

  if (!findComment) {
    throw new AppError("Comment Not found", 404);
  }

  const adOwner = findComment.advertisements.user;
  const commentOwner = findComment.user.id;

  if (userId == adOwner.id || commentOwner === userId) {
    return next();
  }

  throw new AppError("You can't perform this action", 403);
};

export default validateCommentDeleteAdvertiseOwnerMiddleware;

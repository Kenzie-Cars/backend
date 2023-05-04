import { Repository } from "typeorm";
import { Users_advertisements } from "../../entities/users_advertisements.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

export const deleteCommentsService = async (commentId: string) => {
  const commentsRepository: Repository<Users_advertisements> =
    AppDataSource.getRepository(Users_advertisements);

  const comment = await commentsRepository.findOneBy({ id: commentId });

  await commentsRepository.remove(comment!);
};

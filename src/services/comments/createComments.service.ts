import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Users_advertisements } from "../../entities/users_advertisements.entity";
import { Advertisements } from "../../entities/advertisement.entity";
import { AppError } from "../../errors";
import { Users } from "../../entities/user.entity";

export const createCommentsService = async (
  userId: string,
  advertiseId: string,
  comment:string
) => {
  const commentsRepository: Repository<Users_advertisements> =
    AppDataSource.getRepository(Users_advertisements);
  const advertisementRepository: Repository<Advertisements> =
    AppDataSource.getRepository(Advertisements);
  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

  const foundAdvertise = await advertisementRepository.findOneBy({
    id: advertiseId,
  });
  
  const foundUser = await userRepository.findOneBy({ id: userId });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  if (!foundAdvertise) {
    throw new AppError("Advertise not found", 404);
  }

  const commentsResponse = commentsRepository.create({});
  await commentsRepository.save(commentsResponse);

  await commentsRepository.update(
    { id: commentsResponse.id },
    {
      advertisements: foundAdvertise,
      comment,
      user: foundUser,
    }
  );
  commentsResponse.comment = comment;

  return commentsResponse;
};

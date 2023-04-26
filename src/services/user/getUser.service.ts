import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/user.entity";

export const getUserService = async (userId: string) => {
  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      cpf: true,
      advertisements: true,
    },
    relations: {
      advertisements: {
        user: true,
      },
    },
  });

  return user;
};

import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors";

export const deleteUserService = async (userId: string) => {
  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

  const user = await userRepository.findOneBy({ id: userId });

  if(!user){
    throw new AppError("User not found", 404)
  }

  await userRepository.delete(user.id)
};

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
      description: true,
      is_seller: true,
      advertisements: {
        id: true,
        brand: true,
        color: true,
        cover_img: true,
        created_at: true,
        description: true,
        fuel: true,
        is_active: true,
        is_goodSale: true,
        km: true,
        model: true,
        price: true,
        year: true,
        user: { id: true, name: true, email: true, phone: true },
      },
    },
    relations: {
      advertisements: {
        user: true,
      },
    },
  });

  return user;
};

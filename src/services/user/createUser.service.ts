import { Repository } from "typeorm";
import { IUser, IUserResponse } from "../../interfaces/users";
import { Users } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Address } from "../../entities/address.entity";

export const createUserService = async (userData: IUser): Promise<IUserResponse> => {
  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);
const addressRespository: Repository<Address> = AppDataSource.getRepository(Address)

  const userAlreadyExists = await userRepository.findOneBy({
    email: userData.email,
  });

  if (userAlreadyExists) {
    throw new AppError("User already on database, please try login", 409);
  }

  const address = addressRespository.create({...userData.address})
    const newUser = userRepository.create({
        email: userData.email,
        password: userData.password,
        cpf: userData.cpf,
        phone: userData.phone,
        birthDate: userData.birthDate,
        description: userData.description,
        is_adm: userData.is_adm,
        is_seller: userData.is_seller
      })  
      await userRepository.save(newUser)
      return {...newUser, ...address}
};

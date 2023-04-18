import { Repository } from "typeorm";
import { IAddress, IUser, IUserResponse } from "../../interfaces/users";
import { Users } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Address } from "../../entities/address.entity";
import { responseUserSerializer } from "../../schemas/users/users.serializers";

export const createUserService = async (
  userData: IUser, address: IAddress
): Promise<IUserResponse> => {
  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);
  const addressRespository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const userAlreadyExists = await userRepository.findOneBy({
    email: userData.email,
  });

  if (userAlreadyExists) {
    throw new AppError("User already on database, please try login", 409);
  }

  if(address){
    address = addressRespository.create(address);
    await addressRespository.save(address);

  }
  const newUser = userRepository.create({
    ...userData, address:address
  });
  console.log(newUser)
  await userRepository.save(newUser);
  const userResponse = await responseUserSerializer.validate(newUser, {
    stripUnknown: true,
    abortEarly: false,
  });
  return userResponse
};

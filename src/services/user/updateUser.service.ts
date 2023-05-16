import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors";
import { IUserUpdate } from "../../interfaces/users";
import { responseUserSerializer } from "../../schemas/users/users.serializers";

export const updateUserService = async (
  dataToUpdate: IUserUpdate,
  userId: string
) => {
  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

  const { address, ...rest } = dataToUpdate;
  const user = await userRepository.findOne({
    where: { id: userId },
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const updatedUser = userRepository.create({ ...user, ...rest });
  await userRepository.save(updatedUser);

  let newAddress;

  if (address) {
    const addressRepository: Repository<Address> =
      AppDataSource.getRepository(Address);
    const userAddress = await addressRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (userAddress) {
      newAddress = addressRepository.create({
        ...userAddress,
        ...address,
      });
      addressRepository.save(newAddress);
    }
  }

  console.log(user.address);
  const userResponse = await responseUserSerializer.validate(updatedUser, {
    stripUnknown: true,
    abortEarly: false,
  });

  return { ...userResponse, address: newAddress };
};

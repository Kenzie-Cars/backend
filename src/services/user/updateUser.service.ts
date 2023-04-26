import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors";
import { IUserUpdate } from "../../interfaces/users";
import { responseUserSerializer } from "../../schemas/users/users.serializers";
import { hashSync } from "bcryptjs";

export const updateUserService = async (
  dataToUpdate: IUserUpdate,
  userId: string
) => {
  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

  const { address, ...rest } = dataToUpdate;
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if(rest.password){
    rest.password = hashSync(rest.password, 10)
  }

  await userRepository.update({ id: userId }, rest);

  if (address) {
    const addressRepository: Repository<Address> =
      AppDataSource.getRepository(Address);
    const userAddress = await addressRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (userAddress) {
      await addressRepository.update({ id: userAddress.id }, address);
    }

    const updatedUser = await userRepository.findOne({
      where: { id: userId },
      relations: { address: true },
    });
    const userResponse = await responseUserSerializer.validate(updatedUser, {
      stripUnknown: true,
      abortEarly: false,
    });

    return userResponse;
  }
};

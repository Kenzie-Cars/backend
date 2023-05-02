import { AppDataSource } from "../../../data-source"
import { Users } from "../../../entities/user.entity"
import { AppError } from "../../../errors"

export const resetPasswordService = async (email: string) => {
    const userRepository = AppDataSource.getRepository(Users)

    const user = await userRepository.findOne({
        where: { email: email },
        withDeleted: true,
      });

    if(!user){
        throw new AppError("There is not a user with this email", 404);
    }

    
}
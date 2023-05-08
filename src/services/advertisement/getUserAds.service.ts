import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Users } from "../../entities/user.entity"
import { AppError } from "../../errors"

export const getUserAdsService = async (userId: string) => {

    const userRepository: Repository<Users> = AppDataSource.getRepository(Users)

    const userAdvertises = await userRepository
        .createQueryBuilder()
        .from(Users, "users")
        .leftJoinAndSelect("users.advertisements", "advertisements")
        .select(["advertisements", "users.id", "users.name", "users.email", "users.description"])
        .where("advertisements.user = :id", { id: userId })
        .getMany()

    if (!userAdvertises) {
        throw new AppError("Advertises not found", 404)
    }

    return userAdvertises
}
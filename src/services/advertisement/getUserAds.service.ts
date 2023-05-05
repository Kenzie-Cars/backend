import { Repository } from "typeorm"
import { Users } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors"

export const getUserAdsService = async (userId: string) => {

    const userRepository: Repository<Users> = AppDataSource.getRepository(Users)

    const userAdvertises = userRepository
    .createQueryBuilder()
    .from(Users, "users")
    .leftJoinAndSelect("users.advertisements", "advertisements")
    .select(["advertisements", "users.id", "users.name", "users.email"])
    .where("advertisements.user = :id", {id:userId})
    .getMany()

    if(!userAdvertises){
        throw new AppError("Advertises not found", 404)
    }
    
    return userAdvertises
}
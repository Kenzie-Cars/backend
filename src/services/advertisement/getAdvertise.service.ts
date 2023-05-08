import { Repository } from "typeorm";
import { Advertisements } from "../../entities/advertisement.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { ReturnAdvertisementSchema } from "../../schemas/advertisement";

export const getAdvertiseService = async (adId: string) => {
  const advertiseRepository: Repository<Advertisements> =
    AppDataSource.getRepository(Advertisements);

  // const advertise = advertiseRepository.findOne({
  //   where: { id: adId },
  //   select: {
  //       user:{
  //           id:true,
  //           email: true,
  //           name: true,
  //           description:true,
  //           phone: true,
  //       },
  //       userAdvertisements: true,

  //   },
  //   relations: {
  //     user: true,
  //     images: true,
  //     userAdvertisements: true,
  //   },
  // });

  const advertise = await advertiseRepository
  .createQueryBuilder()
  .from(Advertisements, "advertisements")
  .select("advertisements")
  .leftJoin("advertisements.user", "adUser")
  .addSelect(["adUser.id", "adUser.name", "adUser.description"])
  .leftJoinAndSelect("advertisements.images", "images")
  .leftJoinAndSelect("advertisements.userAdvertisements","comments")
  .leftJoin("comments.user", "commentUser")
  .addSelect(["commentUser.id", "commentUser.name", "commentUser.description"])
  .where("advertisements.id = :id", {id:adId})
  .getOne()

  if (!advertise) {
    throw new AppError("Advertise not found.", 404);
  }

  return advertise
};

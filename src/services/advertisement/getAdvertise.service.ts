import { Repository } from "typeorm";
import { Advertisements } from "../../entities/advertisement.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

export const getAdvertiseService = async (adId: string) => {
  const advertiseRepository: Repository<Advertisements> =
    AppDataSource.getRepository(Advertisements);

  const advertise = advertiseRepository.findOne({
    where: { id: adId },
    select: {
        user:{
            id:true,
            email: true,
            name: true,
            description:true,
            phone: true,
        }
    },
    relations: {
      user: true,
      images: true,
    },
  });

  if (!advertise) {
    throw new AppError("Advertise not found.", 404);
  }

  return advertise
};

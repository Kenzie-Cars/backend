import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisements } from "../../entities/advertisement.entity";

const ListAdvertisementService = async () => {
  const advertisementRepository: Repository<Advertisements> =
    AppDataSource.getRepository(Advertisements);

  const advertisements = advertisementRepository.find({
    select: {
        user: {
            id: true,
            email: true,
            name: true
        }
    },
    relations: {
      user: true,
      images: true,
    },
  });

  return advertisements;
};

export default ListAdvertisementService;

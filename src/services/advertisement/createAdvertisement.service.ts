import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisements } from "../../entities/advertisement.entity";
import { Images } from "../../entities/images";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IAdvertisementResponse } from "../../interfaces/advertisements";
import { ReturnAdvertisementSchema } from "../../schemas/advertisement";

const createAdvertisementService = async (
  advertisementData: IAdvertisementResponse,
  userId: string
) => {
  const advertisementRepository: Repository<Advertisements> =
    AppDataSource.getRepository(Advertisements);
  const imagesRepository: Repository<Images> =
    AppDataSource.getRepository(Images);
  const userRepository: Repository<Users> = AppDataSource.getRepository(Users);
  const { images, ...rest } = advertisementData;

  const advertiser = await userRepository.findOneBy({ id: userId });
  if (!advertiser) {
    throw new AppError("Invalid user", 404);
  }
  const advertisement: Advertisements = advertisementRepository.create({ ...rest, user: advertiser });
  const imgs = [];

  for (let image of images!) {
    image.advertisementsId = advertisement.id;

    const currentImage = imagesRepository.create(image);
    await imagesRepository.save(currentImage);
    imgs.push(currentImage);
  }

  advertisement.images = imgs;
  await advertisementRepository.save(advertisement);

  const announcements = await advertisementRepository.findOneBy({
    id: advertisement.id,
  });

  announcements!.images = imgs;

  await advertisementRepository.save(advertisement);

  const newAdvertisement = await ReturnAdvertisementSchema.validate(
    announcements,
    {
      stripUnknown: true,
    }
  );

  return newAdvertisement;
};
export default createAdvertisementService;

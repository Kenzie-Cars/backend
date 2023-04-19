import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisements } from "../../entities/advertisement.entity";
import { Images } from "../../entities/images";
import { IAdvertisementResponse } from "../../interfaces/advertisements";
import { ReturnAdvertisementSchema } from "../../schemas/advertisement";

const createAdvertisementService = async (advertisementData: IAdvertisementResponse) => {

    const advertisementRepository: Repository<Advertisements> = AppDataSource.getRepository(Advertisements);
    const imagesRepository: Repository<Images> = AppDataSource.getRepository(Images);
    const { images, ...rest } = advertisementData;

    const advertisement: Advertisements = advertisementRepository.create(rest);


    const imgs = [];

    for (let image of images!) {
        image.advertisementsId = advertisement.id;

        const currentImage = imagesRepository.create(image);
        await imagesRepository.save(currentImage);
        imgs.push(currentImage);
    }

    advertisement.images = imgs;
    await advertisementRepository.save(advertisement);

    const annoucements = await advertisementRepository.findOneBy({
        id: advertisement.id
    })

    annoucements!.images = imgs

    await advertisementRepository.save(advertisement);

    // await advertisementRepository.save(rest)

    const newAdvertisement = await ReturnAdvertisementSchema.validate(annoucements, {
        stripUnknown: true
    })

    return newAdvertisement
}
export default createAdvertisementService
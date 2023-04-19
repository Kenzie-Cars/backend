import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisements } from "../../entities/advertisement.entity";
import { Images } from "../../entities/images";
import { IUpdateAdvertisement } from "../../interfaces/advertisements";
import { ReturnAdvertisementSchema } from "../../schemas/advertisement";
import { AppError } from "../../errors";

const updateAdvertisementsService = async (advertisementData: IUpdateAdvertisement, id: string) => {

    const advertisementRepository: Repository<Advertisements> = AppDataSource.getRepository(Advertisements);
    const imagesRepository: Repository<Images> = AppDataSource.getRepository(Images);

    const advertisement = await advertisementRepository.findOneBy({
        id: id
    })

    if (!advertisement) {
        throw new AppError('Não existe', 404)
    }

    const { images, ...rest } = advertisementData;

    if (images) {
        const imgs = [];


        for (let image of images!) {

            image.advertisementsId = advertisement.id;

            const currentImage = imagesRepository.create(image);
            await imagesRepository.save(currentImage);
            imgs.push(currentImage);
        }

        advertisement.images = [...imgs, ...advertisement.images]

    }


    const updatedAdvertisement = advertisementRepository.create({
        ...advertisement,
        ...rest
    })

    await advertisementRepository.save(updatedAdvertisement)


    const advertisementSchema = await ReturnAdvertisementSchema.validate(updatedAdvertisement, {
        stripUnknown: true
    })

    return advertisementSchema

}

export default updateAdvertisementsService
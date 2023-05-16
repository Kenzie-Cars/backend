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

            if (!image.image1) {
                image.image1 = advertisement.images[0].image1
            }
            if (!image.image2) {
                image.image2 = advertisement.images[0].image2
            }
            if (!image.image3) {
                image.image3 = advertisement.images[0].image3
            }
            if (!image.image4) {
                image.image4 = advertisement.images[0].image4
            }
            if (!image.image5) {
                image.image5 = advertisement.images[0].image5
            }
            if (!image.image6) {
                image.image6 = advertisement.images[0].image6
            }
            
            const currentImage = imagesRepository.create(image);
            await imagesRepository.save(currentImage);
            imgs.push(currentImage);
        }

        advertisement.images = [...imgs]

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
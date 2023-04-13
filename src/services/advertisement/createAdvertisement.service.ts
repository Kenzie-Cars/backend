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
    await advertisementRepository.save(advertisement);

    const imgs = [];

    // Crie as imagens e associe o ID do anúncio a cada imagem
    for (let image of images!) {
        // Atribua o ID do anúncio à propriedade FK da imagem
        image.advertisementsId = advertisement.id;

        const currentImage = imagesRepository.create(image);
        await imagesRepository.save(currentImage);
        imgs.push(currentImage);
    }

    // Atualize o anúncio com as imagens associadas
    advertisement.images = imgs;
    await advertisementRepository.save(advertisement);

    const annoucements = await advertisementRepository.findOneBy({
        id: advertisement.id
    })

    annoucements!.images = imgs

    await advertisementRepository.save(rest)

    const newAdvertisement = await ReturnAdvertisementSchema.validate(annoucements, {
        stripUnknown: true
    })

    return newAdvertisement
}
export default createAdvertisementService
import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Advertisements } from "../../entities/advertisement.entity"
import { ListAdvertisementsSchema } from "../../schemas/advertisement"

const ListAdvertisementService = async () => {
    const advertisementRepository: Repository<Advertisements> = AppDataSource.getRepository(Advertisements)

    const advertisements = advertisementRepository.find({
        relations: {
            images: true
        }
    })

    return advertisements
}

export default ListAdvertisementService
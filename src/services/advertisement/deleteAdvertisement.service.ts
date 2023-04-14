import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisements } from "../../entities/advertisement.entity";
import { AppError } from "../../errors";


const deleteAdvertisementsService = async (id: string) => {

    const advertisementRepository: Repository<Advertisements> = AppDataSource.getRepository(Advertisements);

    const advertisement = await advertisementRepository.findOneBy({
        id: id
    })

    if (!advertisement) {
        throw new AppError('Not found')
    }

    await advertisementRepository.remove(advertisement)

}

export default deleteAdvertisementsService


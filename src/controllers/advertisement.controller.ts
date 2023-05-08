import { Request, Response } from "express";
import { IAdvertisementResponse } from "../interfaces/advertisements";
import ListAdvertisementService from "../services/advertisement/listAvertisemet.service";
import updateAdvertisementsService from "../services/advertisement/updateAdvertisement.service";
import deleteAdvertisementsService from "../services/advertisement/deleteAdvertisement.service";
import createAdvertisementService from "../services/advertisement/createAdvertisement.service";
import { getAdvertiseService } from "../services/advertisement/getAdvertise.service";


const createAdvertisementController = async (req: Request, res: Response) => {
    const advertisementData: IAdvertisementResponse = req.body
    const user = req.user.id
    const newAdvertisement = await createAdvertisementService(advertisementData, user)
    return res.status(201).json(newAdvertisement)
}

// const listAdvertisementsController = async (req: Request, res: Response) => {
//     const listAdvertsements = await ListAdvertisementService()
//     return res.status(200).json(listAdvertsements)
// }

const listAdvertisementsController = async (req: Request, res: Response) => {
    const listAdvertsements = await ListAdvertisementService(req.query)
    // console.log(req.query)
    return res.status(200).json(listAdvertsements)
}
const getAdvertiseController = async (req: Request, res: Response) => {
    const advertiseId = req.params.id
    const advertise = await getAdvertiseService(advertiseId)
    return res.status(200).json(advertise)
}

const updateAdvertisementsController = async (req: Request, res: Response) => {

    const updatedAdvertisement = await updateAdvertisementsService(req.body, req.params.id)
    return res.status(200).json(updatedAdvertisement)
}

const deleteAdvertisementsController = async (req: Request, res: Response) => {

    await deleteAdvertisementsService(req.params.id)
    return res.status(204).json()
}

export { createAdvertisementController, listAdvertisementsController, updateAdvertisementsController, deleteAdvertisementsController, getAdvertiseController };


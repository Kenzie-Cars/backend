import { Request, Response } from "express";
import { IAdvertisementResponse } from "../interfaces/advertisements";
import createAdvertisementService from "../services/advertisement/createAdvertisement.service";
import deleteAdvertisementsService from "../services/advertisement/deleteAdvertisement.service";
import { getAdvertiseService } from "../services/advertisement/getAdvertise.service";
import { getUserAdsService } from "../services/advertisement/getUserAds.service";
import ListAdvertisementService from "../services/advertisement/listAdvertisement.service";
import updateAdvertisementsService from "../services/advertisement/updateAdvertisement.service";


const createAdvertisementController = async (req: Request, res: Response) => {
    const advertisementData: IAdvertisementResponse = req.body
    const user = req.user.id
    const newAdvertisement = await createAdvertisementService(advertisementData, user)
    return res.status(201).json(newAdvertisement)
}


const listAdvertisementsController = async (req: Request, res: Response) => {
    const listAdvertsements = await ListAdvertisementService(req.query)
    return res.status(200).json(listAdvertsements)
}
const getAdvertiseController = async (req: Request, res: Response) => {
    const advertiseId = req.params.id
    const advertise = await getAdvertiseService(advertiseId)
    return res.status(200).json(advertise)
}

const getUserAdsController = async (req: Request, res: Response) => {
    const userId = req.params.id
    const userAdvertises = await getUserAdsService(userId)
    return res.status(200).json(userAdvertises)
}

const updateAdvertisementsController = async (req: Request, res: Response) => {

    const updatedAdvertisement = await updateAdvertisementsService(req.body, req.params.id)
    return res.status(200).json(updatedAdvertisement)
}

const deleteAdvertisementsController = async (req: Request, res: Response) => {

    await deleteAdvertisementsService(req.params.id)
    return res.status(204).json()
}

export { createAdvertisementController, listAdvertisementsController, updateAdvertisementsController, deleteAdvertisementsController, getAdvertiseController, getUserAdsController };


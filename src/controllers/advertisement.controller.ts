import { Request, Response } from "express";
import { IAdvertisementResponse } from "../interfaces/advertisements";
import createAdvertisementService from "../services/advertisement/createAdvertisement.service";
import ListAdvertisementService from "../services/advertisement/listAvertisemet.service";

const createAdvertisementController = async (req: Request, res: Response) => {
    const advertisementData: IAdvertisementResponse = req.body
    const newAdvertisement = await createAdvertisementService(advertisementData)
    return res.status(201).json(newAdvertisement)
}

const listAdvertisementsController = async (req: Request, res: Response) => {
    const listAdvertsements = await ListAdvertisementService()
    return res.status(200).json(listAdvertsements)
}

export { createAdvertisementController, listAdvertisementsController };


import { Request, Response } from "express"
import { IAdvertisementResponse } from "../interfaces/advertisements"
import createAdvertisementService from "../services/advertisement/createAdvertisement.service"

const createAdvertisementController = async (req: Request, res: Response) => {
    console.log(req.body);
        
    const advertisementData: IAdvertisementResponse = req.body
    
    const newAdvertisement = await createAdvertisementService(advertisementData)
    return res.status(201).json(newAdvertisement)
}

export { createAdvertisementController }

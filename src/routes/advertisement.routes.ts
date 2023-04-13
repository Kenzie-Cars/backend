import { Router } from "express";
import { createAdvertisementController } from "../controllers/advertisement.controller";
import validateDataMiddleware from "../middlewares/validateData.middleware";
import { AdvertisementSchema } from "../schemas/advertisement";

const advertisementsRouter = Router()

advertisementsRouter.post("", validateDataMiddleware(AdvertisementSchema), createAdvertisementController)

export default advertisementsRouter
import { Router } from "express";
import { createAdvertisementController, listAdvertisementsController } from "../controllers/advertisement.controller";
import validateDataMiddleware from "../middlewares/validateData.middleware";
import { AdvertisementSchema } from "../schemas/advertisement";

const advertisementsRouter = Router()

advertisementsRouter.post("", validateDataMiddleware(AdvertisementSchema), createAdvertisementController)
advertisementsRouter.get("", listAdvertisementsController)

export default advertisementsRouter
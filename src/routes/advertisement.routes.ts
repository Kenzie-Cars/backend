import { Router } from "express";
import { createAdvertisementController, listAdvertisementsController, updateAdvertisementsController, deleteAdvertisementsController } from "../controllers/advertisement.controller";
import validateDataMiddleware from "../middlewares/validateData.middleware";
import { AdvertisementSchema } from "../schemas/advertisement";

const advertisementsRouter = Router()

advertisementsRouter.post("", validateDataMiddleware(AdvertisementSchema), createAdvertisementController)
advertisementsRouter.get("", listAdvertisementsController)
advertisementsRouter.patch("/:id", updateAdvertisementsController)
advertisementsRouter.delete("/:id", deleteAdvertisementsController)

export default advertisementsRouter
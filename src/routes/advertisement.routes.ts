import { Router } from "express";
import {
  createAdvertisementController,
  listAdvertisementsController,
  updateAdvertisementsController,
  deleteAdvertisementsController,
} from "../controllers/advertisement.controller";
import validateDataMiddleware from "../middlewares/validateData.middleware";
import { AdvertisementSchema } from "../schemas/advertisement";
import validateAuthMiddleware from "../middlewares/validateAuth.middleware";
import validateSellerMiddleware from "../middlewares/validateSeller.middleware";
import validateUuidMiddleware from "../middlewares/validateUuid.middleware";
import { Advertisements } from "../entities/advertisement.entity";
import validateAdvertiseOwnerMiddleware from "../middlewares/validateAdvertiseOwner.middleware";

const advertisementsRouter = Router();

advertisementsRouter.post(
  "",
  validateAuthMiddleware,
  validateSellerMiddleware,
  validateDataMiddleware(AdvertisementSchema),
  createAdvertisementController
);
advertisementsRouter.get("", listAdvertisementsController);
advertisementsRouter.patch(
  "/:id",
  validateAuthMiddleware,
  validateSellerMiddleware,
  validateAdvertiseOwnerMiddleware,
  validateUuidMiddleware(Advertisements),
  updateAdvertisementsController
);
advertisementsRouter.delete(
  "/:id",
  validateAuthMiddleware,
  validateSellerMiddleware,
  validateAdvertiseOwnerMiddleware,
  validateUuidMiddleware(Advertisements),
  deleteAdvertisementsController
);

export default advertisementsRouter;

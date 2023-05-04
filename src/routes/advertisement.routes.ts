import { Router } from "express";
import {
  createAdvertisementController,
  listAdvertisementsController,
  updateAdvertisementsController,
  deleteAdvertisementsController,
  getAdvertiseController,
} from "../controllers/advertisement.controller";
import validateDataMiddleware from "../middlewares/validateData.middleware";
import { AdvertisementSchema } from "../schemas/advertisement";
import validateAuthMiddleware from "../middlewares/validateAuth.middleware";
import validateSellerMiddleware from "../middlewares/validateSeller.middleware";
import validateUuidMiddleware from "../middlewares/validateUuid.middleware";
import { Advertisements } from "../entities/advertisement.entity";
import validateAdvertiseOwnerMiddleware from "../middlewares/validateAdvertiseOwner.middleware";
import { createCommentsController, deleteCommentsController } from "../controllers/comment.controller";

const advertisementsRouter = Router();

advertisementsRouter.post(
  "",
  validateAuthMiddleware,
  validateSellerMiddleware,
  validateDataMiddleware(AdvertisementSchema),
  createAdvertisementController
);
advertisementsRouter.get("", listAdvertisementsController);
advertisementsRouter.get("/:id", 
validateUuidMiddleware(Advertisements),
getAdvertiseController
);
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

advertisementsRouter.post(
  "/comments/:id",
  validateAuthMiddleware,
  createCommentsController
);
advertisementsRouter.delete(
  "/comments/:id",
  validateAuthMiddleware,
  deleteCommentsController
);

export default advertisementsRouter;

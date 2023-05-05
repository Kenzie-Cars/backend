import { Router } from "express";
import {
  createAdvertisementController,
  listAdvertisementsController,
  updateAdvertisementsController,
  deleteAdvertisementsController,
  getAdvertiseController,
  getUserAdsController,
} from "../controllers/advertisement.controller";
import validateDataMiddleware from "../middlewares/validateData.middleware";
import { AdvertisementSchema } from "../schemas/advertisement";
import validateAuthMiddleware from "../middlewares/validateAuth.middleware";
import validateSellerMiddleware from "../middlewares/validateSeller.middleware";
import validateUuidMiddleware from "../middlewares/validateUuid.middleware";
import { Advertisements } from "../entities/advertisement.entity";
import validateAdvertiseOwnerMiddleware from "../middlewares/validateAdvertiseOwner.middleware";
import { createCommentsController, deleteCommentsController, updateCommentsController } from "../controllers/comment.controller";
import validateCommentOrAdvertiseMiddleware from "../middlewares/validateCommentOrAdvertiseOwner.middleware";
import { Users } from "../entities/user.entity";

const advertisementsRouter = Router();

advertisementsRouter.post(
  "",
  validateAuthMiddleware,
  validateSellerMiddleware,
  validateDataMiddleware(AdvertisementSchema),
  createAdvertisementController,
);

advertisementsRouter.get("", listAdvertisementsController);

advertisementsRouter.get(
  "/:id",
  validateUuidMiddleware(Advertisements),
  getAdvertiseController,
);

advertisementsRouter.get("/user/:id", 
validateUuidMiddleware(Users),
getUserAdsController
);

advertisementsRouter.patch(
  "/:id",
  validateAuthMiddleware,
  validateUuidMiddleware(Advertisements),
  validateSellerMiddleware,
  validateAdvertiseOwnerMiddleware,
  updateAdvertisementsController,
);

advertisementsRouter.delete(
  "/:id",
  validateAuthMiddleware,
  validateUuidMiddleware(Advertisements),
  validateSellerMiddleware,
  validateAdvertiseOwnerMiddleware,
  deleteAdvertisementsController,
);

advertisementsRouter.post(
  "/comments/:id",
  validateAuthMiddleware,
  createCommentsController
);

advertisementsRouter.delete(
  "/comments/:id",
  validateAuthMiddleware,
  validateCommentOrAdvertiseMiddleware,
  deleteCommentsController
);

advertisementsRouter.patch(
  "/comments/:id",
  validateAuthMiddleware,
  validateCommentOrAdvertiseMiddleware,
  updateCommentsController
);

export default advertisementsRouter;

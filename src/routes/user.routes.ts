import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
} from "../controllers/user.controller";
import validateAdvertiseField from "../middlewares/validateAdvertiseField.middleware";
import {
  responseUserSerializer,
  userSerializer,
} from "../schemas/users/users.serializers";
import validateDataMiddleware from "../middlewares/validateData.middleware";
import validateUuidMiddleware from "../middlewares/validateUuid.middleware";
import { Users } from "../entities/user.entity";
import validateIsOwnerOrAdminMiddleware from "../middlewares/validateIsOwnerOrAdmin.middleware";
import validateAuthMiddleware from "../middlewares/validateAuth.middleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  validateDataMiddleware(userSerializer),
  validateAdvertiseField(responseUserSerializer),
  createUserController
);
userRoutes.get(
  "/:id",
  validateAuthMiddleware,
  validateUuidMiddleware(Users),
  validateIsOwnerOrAdminMiddleware,
  getUserController
);
userRoutes.delete(
  "/:id",
  validateAuthMiddleware,
  validateUuidMiddleware(Users),
  validateIsOwnerOrAdminMiddleware,
  deleteUserController
);

import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  updateUserController,
} from "../controllers/user.controller";
import validateAdvertiseField from "../middlewares/validateAdvertiseField.middleware";
import {
  forgotPasswordSerializer,
  resetPasswordSerializer,
  responseUserSerializer,
  userSerializer,
} from "../schemas/users/users.serializers";
import validateDataMiddleware from "../middlewares/validateData.middleware";
import validateUuidMiddleware from "../middlewares/validateUuid.middleware";
import { Users } from "../entities/user.entity";
import validateIsOwnerOrAdminMiddleware from "../middlewares/validateIsOwnerOrAdmin.middleware";
import validateAuthMiddleware from "../middlewares/validateAuth.middleware";
import { resetPasswordController } from "../controllers/auth/passwordRecovery.controller";
import { forgotPasswordController } from "../controllers/auth/forgotPassword.controller";

export const userRoutes: Router = Router();

export const passwordResetRoutes: Router = Router()

export const passwordForgotRoutes: Router = Router()

userRoutes.post(
  "",
  validateDataMiddleware(userSerializer),
  validateAdvertiseField(responseUserSerializer),
  createUserController
);
userRoutes.get(
  "/:id",
  // validateAuthMiddleware,
  // validateUuidMiddleware(Users),
  // validateIsOwnerOrAdminMiddleware,
  getUserController
);
userRoutes.patch(
  "/:id",
  validateAuthMiddleware,
  validateUuidMiddleware(Users),
  validateIsOwnerOrAdminMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  validateAuthMiddleware,
  validateUuidMiddleware(Users),
  validateIsOwnerOrAdminMiddleware,
  deleteUserController
);

passwordForgotRoutes.post(
  '/:userId',
  validateDataMiddleware(forgotPasswordSerializer),
  forgotPasswordController
)

passwordResetRoutes.patch(
  '/:userId/:resetToken',
  validateDataMiddleware(resetPasswordSerializer),
  resetPasswordController
)
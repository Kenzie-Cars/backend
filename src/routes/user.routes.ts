import { Router } from "express";
import { forgotPasswordController } from "../controllers/auth/forgotPassword.controller";
import { resetPasswordController } from "../controllers/auth/passwordRecovery.controller";
import {
  createUserController,
  deleteUserController,
  getUserController,
  updateUserController,
} from "../controllers/user.controller";
import { Users } from "../entities/user.entity";
import validateAdvertiseField from "../middlewares/validateAdvertiseField.middleware";
import validateAuthMiddleware from "../middlewares/validateAuth.middleware";
import validateDataMiddleware from "../middlewares/validateData.middleware";
import validateIsOwnerMiddleware from "../middlewares/validateIsOwnerOrAdmin.middleware";
import validateUuidMiddleware from "../middlewares/validateUuid.middleware";
import {
  forgotPasswordSerializer,
  resetPasswordSerializer,
  responseUserSerializer,
  userSerializer,
} from "../schemas/users/users.serializers";

export const userRoutes: Router = Router();

export const passwordResetRoutes: Router = Router();

export const passwordForgotRoutes: Router = Router();

userRoutes.post(
  "",
  validateDataMiddleware(userSerializer),
  validateAdvertiseField(responseUserSerializer),
  createUserController,
);
userRoutes.get(
  "/:id",
  // validateAuthMiddleware,
  validateUuidMiddleware(Users),
  // validateIsOwnerOrAdminMiddleware,
  getUserController,
);
userRoutes.patch(
  "/:id",
  validateAuthMiddleware,
  validateUuidMiddleware(Users),
  validateIsOwnerMiddleware,
  updateUserController,
);
userRoutes.delete(
  "/:id",
  validateAuthMiddleware,
  validateUuidMiddleware(Users),
  validateIsOwnerMiddleware,
  deleteUserController,
);

passwordForgotRoutes.post(
  "",
  validateDataMiddleware(forgotPasswordSerializer),
  forgotPasswordController,
);

passwordResetRoutes.patch(
  "/:resetToken",
  validateDataMiddleware(resetPasswordSerializer),
  resetPasswordController,
);

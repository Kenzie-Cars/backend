import { Router } from "express";
import { createUserController, getUserController } from "../controllers/user.controller";
import validateAdvertiseField from "../middlewares/validateAdvertiseField.middleware";
import { responseUserSerializer, userSerializer } from "../schemas/users/users.serializers";
import validateDataMiddleware from "../middlewares/validateData.middleware";

export const userRoutes:Router = Router();

userRoutes.post("", validateDataMiddleware(userSerializer), validateAdvertiseField(responseUserSerializer), createUserController)
userRoutes.get("/:id", getUserController)
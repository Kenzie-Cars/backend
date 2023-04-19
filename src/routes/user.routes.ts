import { Router } from "express";
import { createUserController } from "../controllers/user.controller";
import validateAdvertiseField from "../middlewares/validateAdvertiseField.middleware";
import { responseUserSerializer } from "../schemas/users/users.serializers";

export const userRoutes:Router = Router();

userRoutes.post("", validateAdvertiseField(responseUserSerializer), createUserController)
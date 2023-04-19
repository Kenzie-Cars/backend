import { Router } from "express";
import { createUserController } from "../controllers/user.controller";

export const userRoutes:Router = Router();

userRoutes.post("", createUserController)
import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";

export const sessionRoute = Router();

sessionRoute.post("", createSessionController)
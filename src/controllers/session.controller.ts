import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import { createSessionService } from "../services/session/session.service";

export const createSessionController = async (req: Request, res: Response) => {
  const loginData: IUserLogin = req.body;
  const token = await createSessionService(loginData);

  return res.json({ token });
};

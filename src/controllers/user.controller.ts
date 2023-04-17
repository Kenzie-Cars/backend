import { Request, Response } from "express";
import { IUser } from "../interfaces/users";
import { createUserService } from "../services/user/createUser.service";

export const createUserController = async (req: Request, res: Response) => {
    const userData:IUser = req.body
    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
};

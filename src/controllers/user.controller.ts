import { Request, Response } from "express";
import { IUser } from "../interfaces/users";
import { createUserService } from "../services/user/createUser.service";

export const createUserController = async (req: Request, res: Response) => {
    const {address, ...userData} = req.body
    const newUser = await createUserService(userData, address)

    return res.status(201).json(newUser)
};

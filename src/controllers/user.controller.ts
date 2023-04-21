import { Request, Response } from "express";
import { createUserService } from "../services/user/createUser.service";
import { getUserService } from "../services/user/getUser.service";

export const createUserController = async (req: Request, res: Response) => {
    const {address, ...userData} = req.body
    const newUser = await createUserService(userData, address)

    return res.status(201).json(newUser)
};
export const getUserController = async (req: Request, res: Response) => {
    const userId = req.params.id
    const user = await getUserService(userId)

    return res.status(200).json(user)
};

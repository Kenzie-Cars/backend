import { Request, Response } from "express";
import { createUserService } from "../services/user/createUser.service";
import { getUserService } from "../services/user/getUser.service";
import { deleteUserService } from "../services/user/deleteUser.service";
import { updateUserService } from "../services/user/updateUser.service";
import { IUserUpdate } from "../interfaces/users";

export const createUserController = async (req: Request, res: Response) => {
  const { address, ...userData } = req.body;
  const newUser = await createUserService(userData, address);

  return res.status(201).json(newUser);
};

export const getUserController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const user = await getUserService(userId);

  return res.status(200).json(user);
};
export const updateUserController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const dataToUpdate:IUserUpdate = req.body;
  const updatedUser = await updateUserService(dataToUpdate, userId);

  return res.status(200).json(updatedUser);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  await deleteUserService(userId);

  return res.status(204).json();
};

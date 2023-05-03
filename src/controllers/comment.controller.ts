import { Request, Response } from "express";
import { createCommentsService } from "../services/comments/createComments.service";

export const createCommentsController = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const advertiseId = req.params.id
    const {comment} = req.body

    const newComment = await createCommentsService(userId, advertiseId, comment)

    return res.status(201).json(newComment)
}
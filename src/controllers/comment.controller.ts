import { Request, Response } from "express";
import { createCommentsService } from "../services/comments/createComments.service";
import { deleteCommentsService } from "../services/comments/deleteComments.service";
import { updateCommentsService } from "../services/comments/updateComments.service";

export const createCommentsController = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const advertiseId = req.params.id
    const {comment} = req.body

    const newComment = await createCommentsService(userId, advertiseId, comment)

    return res.status(201).json(newComment)
}

export const deleteCommentsController = async (req:Request, res:Response) => {
    const commentId = req.params.id
    await deleteCommentsService(commentId)
    return res.status(204).json()
}

export const updateCommentsController = async (req:Request, res:Response) => {
    const commentId = req.params.id
    const {comment} = req.body
    const updatedComment = await updateCommentsService(comment, commentId)
    return res.status(200).json(updatedComment)
}
import { Repository } from "typeorm"
import { Users_advertisements } from "../../entities/users_advertisements.entity"
import { AppDataSource } from "../../data-source"

export const updateCommentsService = async (newComment:string, commentId: string) => {

    const commentsRepository:Repository<Users_advertisements> = AppDataSource.getRepository(Users_advertisements)

    const foundComment = await commentsRepository.findOne({
        where: {id:commentId}
    })

    const updatedComment = commentsRepository.create({
        ...foundComment,
        comment:newComment
    })
    await commentsRepository.save(updatedComment)

    return updatedComment
}
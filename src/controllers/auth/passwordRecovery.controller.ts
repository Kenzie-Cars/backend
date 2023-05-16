import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { hashSync } from "bcryptjs";

export const resetPasswordController = async (req: Request, res: Response) => {
    const {resetToken} = req.params

    const {password} = req.body

    const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

    const user = await userRepository.findOne({where: {passwordResetToken: resetToken}})

    if(!user){
        return res.status(401).json({
            status: 'failure',
            message: 'invalid token'
        })
    }

    const newPassword = hashSync(password, 10)

    await userRepository.update({id: user.id}, {password: newPassword})

    return res.status(200).json({
        status: 'success',
        message: 'senha alterada com sucesso'
    })
  };
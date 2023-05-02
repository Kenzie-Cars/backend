import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/user.entity";
import { Repository } from "typeorm";
import nodemailer from 'nodemailer'

export const forgotPasswordController = async(req: Request, res: Response) => {
    const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

    const message = 'Você receberá um email com o link de recuperação caso um usuário com este email cadastrado exista'

    const {email} = req.body

    const user = await userRepository.findOne({
        where: { email: email },
        withDeleted: true,
      });

    if(!user){
        return res.status(200).json({
            status: 'success',
            message
        })
    }

    const sendEmail = async() => {
        let testAccount = await nodemailer.createTestAccount();

        
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
            user: testAccount.user, 
            pass: testAccount.pass, 
            },
        });

        const { randomBytes, createHash } = await import('node:crypto')

        const resetToken = randomBytes(4).toString('hex')
        const passwordResetToken = createHash('sha256').update(resetToken).digest('hex')

        await userRepository.update(
            {id: user.id}, 
            {
                passwordResetToken: passwordResetToken
            }
        )

        let info = await transporter.sendMail({
            from: '"kenzie cars" <kenziekars@kenzie.com>', 
            to: email, 
            subject: "Password recovery", 
            text: `Seu link de recuperação: http://127.0.0.1:5173/change-password/${passwordResetToken}`, 
            html: `Seu link de recuperação: <a href="http://127.0.0.1:5173/change-password/${passwordResetToken}"> clique aqui</a>`, 
        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    try {
        sendEmail()
    } catch (error) {
        console.error(error)
    }

    return res.status(200).json({
        status: 'success',
        message
    })
}
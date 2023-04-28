import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/user.entity";
import { Repository } from "typeorm";
import nodemailer from 'nodemailer'

export const forgotPasswordController = async(req: Request, res: Response) => {
    const userRepository: Repository<Users> = AppDataSource.getRepository(Users);

    const message = 'You will receive a recovery email if a user with that email exists'

    const {email} = req.body
    const {userId} =req.params

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
            {id: userId}, 
            {
                passwordResetToken: passwordResetToken
            }
        )

        let info = await transporter.sendMail({
            from: '"kenzie cars" <kenziekars@kenzie.com>', 
            to: email, 
            subject: "Password recovery", 
            text: `send a patch request to http://localhost:3000/resetPassword/${passwordResetToken}`, 
            html: `send a patch request to http://localhost:3000/resetPassword/${passwordResetToken}`, 
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
import nodemailer, { createTestAccount } from 'nodemailer';
import pug from 'pug';
import { convert } from 'html-to-text';
import { IUser } from '../interfaces/users';

export default class Email {
  #to: string;
  #from: string;
  constructor(private user: IUser) {
    this.#to = user.email;
    this.#from = `teste420 <test@test.com>`;
  }

  private async newTransport() {

    let testAccount = await nodemailer.createTestAccount()

    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  private async send( subject: string) {
    
    const mailOptions = {
      from: this.#from,
      to: this.#to,
      subject,
      text: 'Your password reset link',
      html: '<body> Hello world </body>',
    };

    let transporter = await this.newTransport()

    const info = await transporter.sendMail(mailOptions);
    console.log(nodemailer.getTestMessageUrl(info));
  }

  async sendPasswordResetToken() {
    await this.send(
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}



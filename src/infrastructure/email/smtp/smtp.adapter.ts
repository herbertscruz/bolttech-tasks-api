import IEmail from '../../../domain/common/email.interface';
import nodemailer from 'nodemailer';
import env from '../../../configurations';

export default class SmtpEmail implements IEmail {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.EMAIL.HOST,
      port: env.EMAIL.PORT,
      auth: {
        user: env.EMAIL.AUTH_USER,
        pass: env.EMAIL.AUTH_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: env.EMAIL.FROM,
      to,
      subject,
      html,
    });
  }
}

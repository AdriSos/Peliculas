import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: Number(this.config.get('SMTP_PORT')),
      secure: false,
      auth: {
        user: this.config.get('SMTP_USER'),
        pass: this.config.get('SMTP_PASS'),
      },
    });
  }

  async sendCredentialsEmail(to: string, email: string, password: string, verifyLink: string) {
    await this.transporter.sendMail({
      from: `"Jarvix" <${this.config.get('SMTP_USER')}>`,
      to,
      subject: 'Tus credenciales de acceso - Jarvix',
      html: `
        <h2>Bienvenido/a a Jarvix</h2>
        <p>Tu usuario es: <b>${email}</b></p>
        <p>Tu contraseña es: <b>${password}</b></p>
        <p>Verifica tu correo aquí:</p>
        <p><a href="${verifyLink}">${verifyLink}</a></p>
      `,
    });
  }
}
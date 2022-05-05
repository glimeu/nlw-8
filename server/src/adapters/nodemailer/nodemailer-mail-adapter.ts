import nodemailer from 'nodemailer';

import { MailAdapter, sendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '5e782f184ed05d',
    pass: '454959780b11b0',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({body, subject}: sendMailData): Promise<void> {
    transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Miguel Ângelo <example@example.com>',
    subject,
    html: body,
  });
  }
}

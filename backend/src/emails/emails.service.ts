import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { ConfirmationEmailDTO } from './dto/confirmation-email.dto';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(confirmationEmail: ConfirmationEmailDTO) {
    const { to, name, confirmationLink } = confirmationEmail;

    await this.mailerService.sendMail({
      to,
      from: 'no-replay@gerenciadordeestagaio.com',
      context: {
        name,
        confirmationLink,
      },
      subject: 'Confirme seu cadastro',
      template: 'confirmation-email',
    });
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { ConfirmationEmailDTO } from './dto/confirmation-email.dto';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(confirmationEmail: ConfirmationEmailDTO) {
    const {
      to,
      name,
      confirmationlink,
    } = confirmationEmail;

    await this.mailerService.sendMail({
      to,
      from: 'leandro.lima+test1231@oowlish.com',
      context: {
        name,
        confirmationlink,
      },
      subject: 'Confirme seu cadastro',
      template: 'confirmation-email',
    })
  }
}

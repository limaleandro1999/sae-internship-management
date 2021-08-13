import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { ConfirmationEmailDTO } from './dto/confirmation-email.dto';
import { MonthlyReportDeliveredNotificationDTO } from './dto/monthly-report-delivered-notification.dto';
import { SemesterReportDeliveredNotificationDTO } from './dto/semester-report-delivered-notification.dto';
import { StartInternshipProcessNotificationDTO } from './dto/start-internship-process-notification.dto';

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

  async sendStartInternshipProcessNotification(
    startInternshipProcessNotificationBody: StartInternshipProcessNotificationDTO,
  ) {
    const {
      to,
      name,
      internName,
      isMandatory,
      startDate,
    } = startInternshipProcessNotificationBody;

    await this.mailerService.sendMail({
      to,
      from: 'no-replay@gerenciadordeestagaio.com',
      context: {
        internName,
        mandatory: isMandatory ? 'obrigatório' : 'não obrigatório',
        startDate,
        name,
      },
      subject: 'Novo estágio',
      template: 'start-internship-process-notification',
    });
  }

  async sendSemesterReportDeliveredNotification(
    semesterReportDeliveredNotificationDTO: SemesterReportDeliveredNotificationDTO,
  ) {
    const {
      to,
      name,
      internName,
      deliveredDate,
      startDate,
      finishDate,
    } = semesterReportDeliveredNotificationDTO;

    await this.mailerService.sendMail({
      to,
      from: 'no-replay@gerenciadordeestagaio.com',
      context: {
        internName,
        startDate,
        finishDate,
        name,
        deliveredDate,
      },
      subject: 'Relatório Semestral Entregue',
      template: 'semester-report-delivered-notification',
    });
  }

  async sendMonthlyReportDeliveredNotification(
    monthlyReportDeliveredNotificationDTO: MonthlyReportDeliveredNotificationDTO,
  ) {
    const {
      to,
      name,
      internName,
      deliveredDate,
      month,
    } = monthlyReportDeliveredNotificationDTO;

    await this.mailerService.sendMail({
      to,
      from: 'no-replay@gerenciadordeestagaio.com',
      context: {
        internName,
        month,
        name,
        deliveredDate,
      },
      subject: 'Relatório Mensal Entregue',
      template: 'monthly-report-delivered-notification',
    });
  }
}

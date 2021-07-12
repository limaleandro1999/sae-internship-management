import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { Campus } from '../campi/campus.entity';
import { CampusAdmin } from '../campus-admin/campus-admin.entity';
import { Course } from '../courses/course.entity';
import { InternshipSector } from '../internship-sector/internship-sector.entity';
import { User } from '../users/user.entity';
import { Company } from 'src/companies/company.entity';
import { InternshipAdvisor } from 'src/internship-advisors/internship-advisor.entity';
import { Intern } from 'src/interns/intern.entity';
import { InternshipProcess } from 'src/internship-processes/internship-process.entity';
import { SemesterReport } from 'src/reports/semester-report.entity';
import { MonthlyReport } from 'src/reports/monthly-report.entity';
import { Task } from 'src/tasks/task.entity';

export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET ?? 'secretKey',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  },
  server: {
    port: process.env.PORT ?? 3000,
    host: process.env.HOST ?? 'localhost',
    protocol: process.env.PROTOCOL ?? 'http',
  },
  database: {
    url: process.env.DATABASE_URL ?? '',
    type: process.env.DB_TYPE ?? 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT) ?? 5432,
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'root',
    database: process.env.DB_DATABASE ?? 'postgres',
    ssl:
      process.env.DB_SSL === 'true'
        ? {
            rejectUnauthorized: false,
          }
        : null,
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
    logging: true,
    entities: [
      Campus,
      CampusAdmin,
      User,
      InternshipSector,
      Course,
      Company,
      InternshipAdvisor,
      Intern,
      InternshipProcess,
      SemesterReport,
      MonthlyReport,
      Task,
    ],
  },
  mailer: {
    transport: {
      host: process.env.MAILER_HOST ?? 'smtp.gmail.com',
      port: process.env.MAILER_PORT ?? 587,
      tls: {
        rejectUnauthorized: false,
      },
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    template: {
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  },
  links: {
    accountConfimationPrefixLink:
      process.env.LINK_ACCOUNT_CONFIRMATION_PREFIX ??
      'http://localhost:3001/account-confirmation/',
  },
});

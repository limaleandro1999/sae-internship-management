import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { Campus } from '../campi/campus.entity';
import { CampusAdmin } from '../campus-admin/campus-admin.entity';
import { Course } from '../courses/course.entity';
import { InternshipSector } from '../internship-sector/internship-sector.entity';
import { User } from '../users/user.entity';
import { Company } from 'src/companies/company.entity';
import { InternshipAdvisor } from 'src/internship-advisors/internship-advisor.entity';

export default () => ({
  server: {
    port: process.env.PORT ?? 3000,
  },
  database: {
    url: process.env.DATABASE_URL ?? '',
    type: process.env.DB_TYPE ?? 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT) ?? 5432,
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'root',
    database: process.env.DB_DATABASE ?? 'postgres',
    ssl: process.env.DB_SSL === 'true' ? true : false,
    synchronize: true,
    logging: true,
    entities: [
      Campus,
      CampusAdmin,
      User,
      InternshipSector,
      Course,
      Company,
      InternshipAdvisor,
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
      dir:
        process.env.TEMPLATE_DIR ??
        'D:\\projects\\internship-management\\backend\\templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  },
});

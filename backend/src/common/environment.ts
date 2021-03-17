import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

import { Campus } from "../campi/campus.entity";
import { CampusAdmin } from "../campus-admin/campus-admin.entity";
import { Course } from "../courses/course.entity";
import { InternshipSector } from "../internship-sector/internship-sector.entity";
import { User } from "../users/user.entity";
import { Company } from "src/companies/company.entity";

export const environment = {
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    synchronize: true,
    logging: true,
    entities: [Campus, CampusAdmin, User, InternshipSector, Course, Company],
  },
  mailer: {
    transport: {
      host: 'localhost',
      port: 25,
      tls: {
        rejectUnauthorized: false
      },
    },
    template: {
      dir: 'D:\\projects\\internship-management\\backend\\templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  },
}
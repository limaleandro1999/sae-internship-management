import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampiModule } from './campi/campi.module';

import { RequestParamsMiddleware } from './common/middlewares/request-params.middleware';
import { CampusAdminModule } from './campus-admin/campus-admin.module';
import { EmailsService } from './emails/emails.service';
import { UsersModule } from './users/users.module';
import { InternshipSectorModule } from './internship-sector/internship-sector.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import environment from './common/environment';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CompaniesModule } from './companies/companies.module';
import { InternshipAdvisorsModule } from './internship-advisors/internship-advisors.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [environment] }),
    TypeOrmModule.forRoot(
      environment().database.url
        ? {
            url: environment().database.url,
            entities: environment().database.entities,
            type: 'postgres',
          }
        : {
            ...environment().database,
            type: 'postgres',
          },
    ),
    MailerModule.forRoot(environment().mailer),
    CampiModule,
    CampusAdminModule,
    UsersModule,
    InternshipSectorModule,
    CoursesModule,
    AuthModule,
    CompaniesModule,
    InternshipAdvisorsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailsService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestParamsMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.GET });
  }
}

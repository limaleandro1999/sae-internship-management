import { Module, NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { Connection } from 'typeorm';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampiModule } from './campi/campi.module';

import { Campus } from './campi/campus.entity';

import { RequestParamsMiddleware } from './common/middlewares/request-params.middleware';
import { CampusAdminModule } from './campus-admin/campus-admin.module';
import { CampusAdmin } from './campus-admin/campus-admin.entity';
import { EmailsService } from './emails/emails.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'postgres',
      synchronize: true,
      logging: true,
      entities: [Campus, CampusAdmin],
    }),
    MailerModule.forRoot({
      transport: 'smtps://limaleandro1999@gmail.com:a6Z7g3BD8nhJLMkb@smtp-relay.sendinblue.com',
      template: {
        dir: 'D:\\projects\\internship-management\\backend\\templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    CampiModule,
    CampusAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailsService],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestParamsMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.GET });
  }
}

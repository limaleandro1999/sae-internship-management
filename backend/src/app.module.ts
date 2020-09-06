import { Module, NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampiModule } from './campi/campi.module';

import { Campus } from './campi/campus.entity';

import { RequestParamsMiddleware } from './common/middlewares/request-params.middleware';

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
      entities: [Campus],
    }),
    CampiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestParamsMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.GET });
  }
}

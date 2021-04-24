import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import environment from './common/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(environment().server.port);
}
bootstrap();

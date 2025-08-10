import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/ioc/modules/app.module';
import 'reflect-metadata';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useBodyParser('text');
  await app.listen(34200);
}
bootstrap();

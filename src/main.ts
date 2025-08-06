import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/ioc/modules/app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(34200);
}
bootstrap();

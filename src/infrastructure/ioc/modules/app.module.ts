import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import printerConfig from 'src/infrastructure/config/printer.config';
import { ApiModule } from './layers/app.api.module';
import { AuthModule } from './layers/app.auth.module';
import { DomainModule } from './layers/app.domain.module';
import { InfrastructureModule } from './layers/app.infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [printerConfig],
    }),
    InfrastructureModule,
    DomainModule,
    ApiModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

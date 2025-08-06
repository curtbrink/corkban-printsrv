import { Module } from '@nestjs/common';
import { allModules } from '../module-specs';
import { DomainModule } from './app.domain.module';
import { InfrastructureModule } from './app.infrastructure.module';

@Module({
  imports: [DomainModule, InfrastructureModule],
  providers: allModules.flatMap((m) => m.apiProviders || []),
  exports: [],
  controllers: allModules.flatMap((m) => m.apiControllers || []),
})
export class ApiModule {}

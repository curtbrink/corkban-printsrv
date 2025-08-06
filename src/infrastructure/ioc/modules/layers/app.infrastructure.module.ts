import { allModules } from '../module-specs';
import { forwardRef, Module } from '@nestjs/common';
import { DomainModule } from './app.domain.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const schemas = allModules.flatMap((m) => m.schemas || []);
const providers = allModules.flatMap((m) => m.infrastructureProviders || []);

@Module({
  imports: [forwardRef(() => DomainModule), TypeOrmModule.forFeature(schemas)],
  providers: providers,
  exports: providers,
  controllers: [],
})
export class InfrastructureModule {}

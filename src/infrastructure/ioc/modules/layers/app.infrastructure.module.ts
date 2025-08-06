import { allModules } from '../module-specs';
import { forwardRef, Module } from '@nestjs/common';
import { DomainModule } from './app.domain.module';

const schemas = allModules.flatMap((m) => m.schemas || []);
const providers = allModules.flatMap((m) => m.infrastructureProviders || []);

@Module({
  imports: [forwardRef(() => DomainModule)],
  providers: providers,
  exports: providers,
  controllers: [],
})
export class InfrastructureModule {}

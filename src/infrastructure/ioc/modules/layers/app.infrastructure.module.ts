import { forwardRef, Module } from '@nestjs/common';
import { allModules } from '../module-specs';
import { DomainModule } from './app.domain.module';

const providers = allModules.flatMap((m) => m.infrastructureProviders || []);

@Module({
  imports: [forwardRef(() => DomainModule)],
  providers: providers,
  exports: providers,
  controllers: [],
})
export class InfrastructureModule {}

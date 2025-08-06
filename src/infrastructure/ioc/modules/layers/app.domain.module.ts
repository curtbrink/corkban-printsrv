import { allModules } from '../module-specs';
import { forwardRef, Module } from '@nestjs/common';
import { InfrastructureModule } from './app.infrastructure.module';

const providers = allModules.flatMap((m) => m.domainProviders || []);

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
  providers: providers,
  exports: providers,
  controllers: [],
})
export class DomainModule {}

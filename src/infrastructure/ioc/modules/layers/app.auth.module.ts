import { Module } from '@nestjs/common';
import { AuthenticationService } from '../../../../domain/authentication/authentication.service';
import { DomainModule } from './app.domain.module';
import { InfrastructureModule } from './app.infrastructure.module';

@Module({
  imports: [DomainModule, InfrastructureModule],
  providers: [AuthenticationService],
  exports: [],
})
export class AuthModule {}

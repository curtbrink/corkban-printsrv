import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import printerConfig from 'src/infrastructure/config/printer.config';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(printerConfig.KEY)
    private config: ConfigType<typeof printerConfig>,
  ) {}

  async checkSecretKey(givenKey: string): Promise<any> {
    if (givenKey !== this.config.secretKey) {
      return new UnauthorizedException('Invalid key!');
    }

    return true;
  }
}

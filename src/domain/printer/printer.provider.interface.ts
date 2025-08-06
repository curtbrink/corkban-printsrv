import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IPrinterProvider {
  abstract printText(text: string): Promise<boolean>;
}

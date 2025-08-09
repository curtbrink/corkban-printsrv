import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IPrinterProvider {
  abstract printText(text: string): Promise<boolean>;
  abstract printImage(filePath: string): Promise<boolean>;
}

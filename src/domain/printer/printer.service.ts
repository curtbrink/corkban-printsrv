import { Injectable } from '@nestjs/common';
import { IPrinterProvider } from './printer.provider.interface';

@Injectable()
export class PrinterService {
  constructor(private readonly printerProvider: IPrinterProvider) {}

  async printThing(thing: string): Promise<boolean> {
    return this.printerProvider.printText(thing);
  }

  async printImage(filePath: string): Promise<boolean> {
    return this.printerProvider.printImage(filePath);
  }
}

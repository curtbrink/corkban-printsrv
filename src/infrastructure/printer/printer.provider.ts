import { Injectable } from '@nestjs/common';
import { IPrinterProvider } from 'src/domain/printer/printer.provider.interface';

@Injectable()
export class PrinterProvider extends IPrinterProvider {
  printText(text: string): Promise<boolean> {
    // todo this is where the escpos stuff would go
    console.log('would have printed: ' + text);
    throw new Error('Method not implemented.');
  }
}

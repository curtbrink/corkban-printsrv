import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Printer } from 'escpos';
import * as Network from 'escpos-network';
import { IPrinterProvider } from 'src/domain/printer/printer.provider.interface';
import printerConfig from '../config/printer.config';

@Injectable()
export class PrinterProvider extends IPrinterProvider {
  constructor(
    @Inject(printerConfig.KEY)
    private config: ConfigType<typeof printerConfig>,
  ) {
    super();

    console.dir(Network);

    this.device = new Network(config.host!, Number.parseInt(config.port!));
    this.printer = new Printer(this.device);
  }

  private device: Network;
  private printer: Printer;

  async printText(text: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.device.open((err, dev) => {
        if (err) {
          console.error(err);
          reject(false);
        }

        this.printer
          .align('CT')
          .text(text)
          .cut(true, 2)
          .flush((err) => {
            if (err) {
              console.error(err);
              reject(false);
            }
          });

        resolve(true);
      });
    });
  }
}

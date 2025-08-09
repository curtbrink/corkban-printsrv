import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Printer, Image } from 'escpos';
import * as Network from 'escpos-network';
import { IPrinterProvider } from 'src/domain/printer/printer.provider.interface';
import printerConfig from '../config/printer.config';
import {
  Network as NetworkTyped,
  Printer as PrinterTyped,
} from 'src/escpos.types';

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

  private device: NetworkTyped;
  private printer: PrinterTyped;

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

  async printImage(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Image.load(filePath, 'image/png', (img: Image | Error) => {
        if (img instanceof Error) {
          console.error(img);
          reject(false);
        }

        this.device.open((err, dev) => {
          if (err) {
            console.error(err);
            reject(false);
          }

          this.printer
            .align('CT')
            .image(img as Image)
            .then(() => {
              this.printer.cut(true, 2).close();
            });
        });
      });
      resolve(true);
    });
  }
}

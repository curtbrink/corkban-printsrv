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
  }

  async printText(text: string): Promise<boolean> {
    const { printer, device } = await this.openPrinter();

    return new Promise((resolve, reject) => {
      printer.align('CT').text(text);
      this.finalizePrint(printer, device, resolve, reject);
    });
  }

  async printImage(filePath: string): Promise<boolean> {
    const { printer, device } = await this.openPrinter();

    return new Promise((resolve, reject) => {
      Image.load(filePath, 'image/png', (img: Image | Error) => {
        if (img instanceof Error) {
          console.error(img);
          reject(false);
        }

        printer
          .align('CT')
          .image(img as Image)
          .then(() => {
            this.finalizePrint(printer, device, resolve, reject);
          });
      });
    });
  }

  private async openPrinter(): Promise<{
    printer: PrinterTyped;
    device: NetworkTyped;
  }> {
    return new Promise((resolve, reject) => {
      const device = new Network(
        this.config.host!,
        Number.parseInt(this.config.port!),
      ) as NetworkTyped;
      device.open((err, dev) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        const printer = new Printer(dev) as PrinterTyped;
        resolve({ printer, device });
      });
    });
  }

  private finalizePrint(
    printer: PrinterTyped,
    device: NetworkTyped,
    resolve: (v: boolean) => void,
    reject: (v: boolean) => void,
  ) {
    printer.cut(true, 2).flush((err) => {
      if (err) {
        console.error(err);
        reject(false);
      }
      device.close((err) => {
        if (err) {
          console.error(err);
          reject(false);
        }
        resolve(true);
      });
    });
  }
}

import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { ServiceResult } from 'src/util';
import { ImageService } from '../image/image.service';
import { IPrinterProvider } from './printer.provider.interface';

@Injectable()
export class PrinterService {
  constructor(
    private readonly printerProvider: IPrinterProvider,
    private readonly imageService: ImageService,
  ) {}

  async printText(text: string): Promise<ServiceResult> {
    try {
      await this.printerProvider.printText(text);
      return { message: 'Text printed successfully' };
    } catch (error: any) {
      console.error(error);
      return { message: 'Failed to print text', error };
    }
  }

  async printImage(imageData: string): Promise<ServiceResult> {
    // we have to write the image to a tmp file,
    // because the escpos library loads the image from a file
    const tmpFilePath = path.join('.', 'tmp.png');
    try {
      await this.imageService.writeImageToFile(imageData, tmpFilePath);
    } catch (error: any) {
      console.error(error);
      return { message: 'Failed to write image data to temp file', error };
    }

    try {
      await this.printerProvider.printImage(tmpFilePath);
      return { message: 'Successfully printed image' };
    } catch (error: any) {
      console.error(error);
      return { message: 'Failed to print image from temp file', error };
    }
  }
}

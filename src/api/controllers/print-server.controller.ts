import { Body, Controller, Post } from '@nestjs/common';
import { PrinterService } from 'src/domain/printer/printer.service';
import { ServiceResult } from 'src/util';

@Controller('/')
export class PrintServerController {
  constructor(private readonly printerService: PrinterService) {}

  @Post('print/text')
  async printText(@Body() body: { text: string }): Promise<ServiceResult> {
    return await this.printerService.printText(body.text);
  }

  @Post('print/image')
  async printImage(@Body() body: string): Promise<ServiceResult> {
    return await this.printerService.printImage(body);
  }
}

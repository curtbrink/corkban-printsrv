import { Controller, Get } from '@nestjs/common';
import { PrinterService } from 'src/domain/printer/printer.service';

@Controller('/')
export class PrintServerController {
  constructor(private readonly printerService: PrinterService) {}

  @Get()
  async testPrint(): Promise<boolean> {
    return this.printerService.printThing(
      'This is a test of the printer service infrastructure!',
    );
  }
}

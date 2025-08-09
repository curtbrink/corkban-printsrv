import { Controller, Get } from '@nestjs/common';
import { ImageGeneratorService } from 'src/domain/image-generator/image-generator.service';
import { PrinterService } from 'src/domain/printer/printer.service';

@Controller('/')
export class PrintServerController {
  constructor(
    private readonly printerService: PrinterService,
    private readonly imageGeneratorService: ImageGeneratorService,
  ) {}

  @Get()
  async testPrint(): Promise<boolean> {
    return this.printerService.printThing(
      'This is a test of the printer service infrastructure!',
    );
  }

  @Get('testimage')
  async testImageGen(): Promise<string> {
    const filePath = await this.imageGeneratorService.writeTextOnImage(
      'this is some text :3',
    );
    await this.printerService.printImage(filePath);
    return filePath;
  }
}

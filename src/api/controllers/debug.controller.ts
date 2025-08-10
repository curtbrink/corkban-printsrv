import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import * as path from 'path';
import * as PImage from 'pureimage';
import { ImageService } from 'src/domain/image/image.service';
import { PrinterService } from 'src/domain/printer/printer.service';
import { ServiceResult } from 'src/util';
import { Readable } from 'stream';

@Controller('debug')
export class DebugController {
  constructor(
    private readonly printerService: PrinterService,
    private readonly imageGeneratorService: ImageService,
  ) {}

  @Get()
  async testPrint(): Promise<ServiceResult> {
    return this.printerService.printText(
      'This is a test of the printer service infrastructure! :3',
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

  @Get('encode/:fileName')
  async encodeImage(@Param('fileName') fileName: string): Promise<string> {
    console.log('encoding thing');
    const filePath = path.join('.', fileName);
    const imgBuffer = await readFile(filePath);
    const readableBuffer = Readable.from(imgBuffer);
    const pngImg = await PImage.decodeJPEGFromStream(readableBuffer);
    const tmppath = path.join('.', 'tmpencode.png');
    const writeStream = createWriteStream(tmppath);
    await PImage.encodePNGToStream(pngImg, writeStream);

    const img = (await readFile(tmppath)) as Buffer;
    console.log('encoded thing');
    return img.toString('base64url');
  }

  @Post('decode')
  async decodeImage(@Body() img: string): Promise<void> {
    const imgBuffer = Buffer.from(img, 'base64url');
    console.log('decoded img');
    const fileName = path.join('.', 'tmp.png');
    await writeFile(fileName, imgBuffer);
    console.log('wrote file');

    await this.printerService.printImage(fileName);
    console.log('printed thing');
  }
}

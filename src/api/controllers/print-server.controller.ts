import { Body, Controller, Get, Param, Post, RawBody } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { createWriteStream } from 'fs';
import * as path from 'path';
import { ImageGeneratorService } from 'src/domain/image-generator/image-generator.service';
import { PrinterService } from 'src/domain/printer/printer.service';
import { Readable } from 'stream';
import * as PImage from 'pureimage';

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

  @Get('encode/:fileName')
  async encodeImage(@Param('fileName') fileName: string): Promise<string> {
    console.log('encoding thing');
    const filePath = path.join('.', fileName);
    const imgBuffer = await readFile(filePath);
    const readableBuffer = Readable.from(imgBuffer);
    const pngImg = await PImage.decodePNGFromStream(readableBuffer);
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

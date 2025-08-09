import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fsp from 'fs/promises';
import * as fs from 'fs';
import * as PImage from 'pureimage';
import { Readable } from 'stream';
import * as os from 'os';
import { randomUUID } from 'node:crypto';
import { WriteStream } from 'node:fs';

@Injectable()
export class ImageGeneratorService {
  constructor() {
    const ticketFont = PImage.registerFont(
      path.join('.', 'assets', 'fonts', 'LibertinusSans-Regular.ttf'),
      'TicketTextFont',
    );
    ticketFont.loadSync();
  }

  async writeTextOnImage(text: string): Promise<string> {
    const imgBuffer = await fsp.readFile(
      path.join('.', 'assets', 'images', 'template-housechore.png'),
    );
    const imgStream = Readable.from(imgBuffer);
    const templatePng = await PImage.decodePNGFromStream(imgStream);

    const ctx = templatePng.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.font = '36pt TicketTextFont';
    ctx.fillText(text, 32, 96);

    const id = `ticket-${randomUUID()}.png`;
    const tmpImgFilePath = path.join(os.tmpdir(), id);
    const writeStream = fs.createWriteStream(tmpImgFilePath);

    await PImage.encodePNGToStream(templatePng, writeStream);

    return tmpImgFilePath;
  }
}

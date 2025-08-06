import { Test, TestingModule } from '@nestjs/testing';
import { PrintServerController } from './print-server.controller';
import { PrinterService } from 'src/domain/printer/printer.service';

describe('AppController', () => {
  let appController: PrintServerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PrintServerController],
      providers: [PrinterService],
    }).compile();

    appController = app.get<PrintServerController>(PrintServerController);
  });

  describe('root', () => {
    it('should do a thing', () => {
      expect(appController.testPrint()).toBeTruthy();
    });
  });
});

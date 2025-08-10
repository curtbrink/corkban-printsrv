import { PrintServerController } from 'src/api/controllers/print-server.controller';
import { IPrinterProvider } from 'src/domain/printer/printer.provider.interface';
import { PrinterService } from 'src/domain/printer/printer.service';
import { ModuleSpec } from 'src/infrastructure/ioc/types';
import { PrinterProvider } from 'src/infrastructure/printer/printer.provider';

const printerProvider = {
  provide: IPrinterProvider,
  useClass: PrinterProvider,
};

const moduleSpec: ModuleSpec = {
  infrastructureProviders: [printerProvider],
  domainProviders: [PrinterService],
  apiControllers: [PrintServerController],
};

export default moduleSpec;

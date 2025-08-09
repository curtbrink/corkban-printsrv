import { ImageGeneratorService } from 'src/domain/image-generator/image-generator.service';
import { ModuleSpec } from 'src/infrastructure/ioc/types';

const moduleSpec: ModuleSpec = {
  infrastructureProviders: [],
  domainProviders: [ImageGeneratorService],
  apiControllers: [],
};

export default moduleSpec;

import { ImageService } from 'src/domain/image/image.service';
import { ModuleSpec } from 'src/infrastructure/ioc/types';

const moduleSpec: ModuleSpec = {
  infrastructureProviders: [],
  domainProviders: [ImageService],
  apiControllers: [],
};

export default moduleSpec;

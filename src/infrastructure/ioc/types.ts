import { Provider, Type } from '@nestjs/common';

export type ModuleSpec = {
  apiProviders?: Provider[];
  apiControllers?: Type[];
  domainProviders?: Provider[];
  infrastructureProviders?: Provider[];
};

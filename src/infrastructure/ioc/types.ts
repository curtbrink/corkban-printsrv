import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Provider, Type } from '@nestjs/common';

export type ModuleSpec = {
  apiProviders?: Provider[];
  apiControllers?: Type[];
  domainProviders?: Provider[];
  infrastructureProviders?: Provider[];
  schemas?: EntityClassOrSchema[];
};

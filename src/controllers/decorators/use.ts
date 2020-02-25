import 'reflect-metadata';
import { RequestHandler } from 'express';
import { DecoratorFunction, MetadataKeys } from './types';

export function use(middleware: RequestHandler): DecoratorFunction {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    const middlewares: RequestHandler[] =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}

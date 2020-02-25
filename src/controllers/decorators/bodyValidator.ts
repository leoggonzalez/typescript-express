import 'reflect-metadata';
import { DecoratorFunction, MetadataKeys } from './types';

export function bodyValidator(...keys: string[]): DecoratorFunction {
  return function(target: any, key: string, desc: PropertyDescriptor): void {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}

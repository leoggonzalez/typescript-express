import 'reflect-metadata';
import { DecoratorFunction, Methods, MetadataKeys } from './types';

export function routeBinder(method: string) {
  return function(path: string): DecoratorFunction {
    return function(target: any, key: string, desc: PropertyDescriptor): void {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);

import { Request } from 'express';

export type ClassDecoratorFunction = (target: Function) => void;

export type DecoratorFunction = (
  target: any,
  key: string,
  desc: PropertyDescriptor
) => void;

export enum Methods {
  get = 'get',
  post = 'post',
  patch = 'patch',
  del = 'delete',
  put = 'put',
}

export enum MetadataKeys {
  path = 'path',
  method = 'method',
  middleware = 'middleware',
  validator = 'validator',
}

export interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

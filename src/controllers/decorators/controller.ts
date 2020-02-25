import 'reflect-metadata';
import { ClassDecoratorFunction, Methods, MetadataKeys } from './types';
import { AppRouter } from '../../AppRouter';
import { RequestHandler, NextFunction, Request, Response } from 'express';

function bodyValidators(keys: string[]): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction): void {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send('Missing property in form');
        return;
      }
    }

    next();
  };
}

export function controller(routePrefix: string): ClassDecoratorFunction {
  return function(target: Function): void {
    const router = AppRouter.getInstance();

    for (const key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}

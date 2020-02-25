"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var types_1 = require("./types");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(types_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(types_1.MetadataKeys.method, method, target, key);
        };
    };
}
exports.routeBinder = routeBinder;
exports.get = routeBinder(types_1.Methods.get);
exports.put = routeBinder(types_1.Methods.put);
exports.post = routeBinder(types_1.Methods.post);
exports.del = routeBinder(types_1.Methods.del);
exports.patch = routeBinder(types_1.Methods.patch);

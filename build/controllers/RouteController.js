"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
function requireAuth(req, res, next) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}
var Rootcontroller = /** @class */ (function () {
    function Rootcontroller() {
    }
    Rootcontroller.prototype.getRoot = function (req, res) {
        var _a;
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
            res.send("\n      <div>\n        <div>You are logged in </div>\n        <a href=\"/auth/logout\">Logout</a>\n      </div>\n    ");
        }
        else {
            res.redirect('/auth/login');
        }
    };
    Rootcontroller.prototype.getProtected = function (req, res) {
        res.send("\n    <p>Welcome to protected route</p>\n  ");
    };
    __decorate([
        decorators_1.get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], Rootcontroller.prototype, "getRoot", null);
    __decorate([
        decorators_1.get('/protected'),
        decorators_1.use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], Rootcontroller.prototype, "getProtected", null);
    Rootcontroller = __decorate([
        decorators_1.controller('')
    ], Rootcontroller);
    return Rootcontroller;
}());
exports.Rootcontroller = Rootcontroller;

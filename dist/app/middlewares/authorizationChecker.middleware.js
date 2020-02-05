"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const services_1 = require("../../services");
const utils_1 = require("../../utils");
const jwtService = typedi_1.Container.get(services_1.JWTService);
function authorizationChecker(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = utils_1.extractToken(ctx.request.headers);
        const payload = yield jwtService.verify(token);
        if (!payload) {
            return false;
        }
        return true;
    });
}
exports.authorizationChecker = authorizationChecker;
//# sourceMappingURL=../../../src/dist/app/middlewares/authorizationChecker.middleware.js.map
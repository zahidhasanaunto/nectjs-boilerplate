"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const typedi_1 = require("typedi");
const JWT_SECRET = config_1.default.has('auth.jwtSecret')
    ? config_1.default.get('auth.jwtSecret')
    : 'changeinconfig';
let JWTService = class JWTService {
    sign(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.sign(payload, JWT_SECRET, options);
        });
    }
    verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.verify(token, JWT_SECRET);
        });
    }
    makeAccessToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const configAccess = {
                payload: Object.assign({}, user),
                options: {
                    algorithm: 'HS512',
                    subject: user.uuid,
                    expiresIn: '30m'
                }
            };
            const token = yield this.sign(configAccess.payload, configAccess.options);
            const tokenData = jsonwebtoken_1.decode(token);
            const exp = tokenData.exp;
            return { token, exp };
        });
    }
    makeRefreshToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const configRefresh = {
                payload: {
                    refreshToken: true,
                    username: user.username
                },
                options: {
                    algorithm: 'HS512',
                    subject: user.uuid,
                    expiresIn: '60d'
                }
            };
            const refreshToken = yield this.sign(configRefresh.payload, configRefresh.options);
            return refreshToken;
        });
    }
};
JWTService = __decorate([
    typedi_1.Service()
], JWTService);
exports.JWTService = JWTService;
//# sourceMappingURL=../../src/dist/services/jwt.service.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const authorizationChecker_middleware_1 = require("./middlewares/authorizationChecker.middleware");
const koa2_swagger_ui_1 = __importDefault(require("koa2-swagger-ui"));
const DEVELOPMENT = process.env.NODE_ENV === 'development';
let App = class App {
    constructor() {
        routing_controllers_1.useContainer(typedi_1.Container);
        this.application = routing_controllers_1.createKoaServer({
            development: DEVELOPMENT,
            routePrefix: '/api/v1',
            cors: true,
            controllers: [__dirname + '/../app/controllers/**/*.controller.js'],
            middlewares: [__dirname + '/../app/middlewares/**/*.middleware.js'],
            authorizationChecker: authorizationChecker_middleware_1.authorizationChecker,
            validation: { validationError: { target: false } }
        });
        this.application.use(koa2_swagger_ui_1.default({
            routePrefix: '/docs/api',
            swaggerOptions: {
                url: 'http://localhost:3000/api/v1/docs/swagger-json',
            },
        }));
    }
    getApp() {
        return this.application;
    }
};
App = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], App);
exports.App = App;
//# sourceMappingURL=../../src/dist/app/app.js.map
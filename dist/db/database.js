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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const ConnectionSecure_1 = require("../decorators/ConnectionSecure");
let Database = class Database {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                yield this.connection.connect();
                return this.connection;
            }
            typeorm_1.useContainer(typedi_1.Container);
            this.connection = yield typeorm_1.createConnection();
            return this.connection;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection.isConnected) {
                yield this.connection.close();
            }
        });
    }
    executeSQL(sql, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.createQueryRunner().query(sql, params);
        });
    }
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.dropDatabase();
            yield this.connection.runMigrations();
        });
    }
    runMigrations() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.runMigrations();
        });
    }
    dropDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.dropDatabase();
        });
    }
};
Database = __decorate([
    typedi_1.Service(),
    ConnectionSecure_1.ConnectionSecure(["connect"])
], Database);
exports.Database = Database;
//# sourceMappingURL=../../src/dist/db/database.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const routing_controllers_1 = require("routing-controllers");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const userInfo_entity_1 = require("./../../../db/entities/user/userInfo.entity");
const userInfo_repository_1 = require("../../../db/repositories/user/userInfo.repository");
let UserInfoController = class UserInfoController {
    constructor(repository) {
        this.repository = repository;
        this.relations = [];
    }
    all(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.getDataAll(queryParams, this.relations);
        });
    }
    byId(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.getDataById(uuid, this.relations);
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.insertData(body);
        });
    }
    updateById(uuid, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.updateData(uuid, body);
        });
    }
    deleteById(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.deleteData(uuid);
        });
    }
};
UserInfoController.ENTITY = 'UserInfo';
__decorate([
    routing_controllers_1.Get('/'),
    __param(0, routing_controllers_1.QueryParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserInfoController.prototype, "all", null);
__decorate([
    routing_controllers_1.Get('/:uuid'),
    __param(0, routing_controllers_1.Param('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserInfoController.prototype, "byId", null);
__decorate([
    routing_controllers_1.Post('/'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userInfo_entity_1.UserInfo]),
    __metadata("design:returntype", Promise)
], UserInfoController.prototype, "create", null);
__decorate([
    routing_controllers_1.Put('/:uuid'),
    __param(0, routing_controllers_1.Param('uuid')), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserInfoController.prototype, "updateById", null);
__decorate([
    routing_controllers_1.Delete('/:uuid'),
    __param(0, routing_controllers_1.Param('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserInfoController.prototype, "deleteById", null);
UserInfoController = __decorate([
    routing_controllers_1.JsonController('/userInfos'),
    __param(0, typeorm_typedi_extensions_1.InjectRepository()),
    __metadata("design:paramtypes", [userInfo_repository_1.UserInfoRepository])
], UserInfoController);
exports.UserInfoController = UserInfoController;
//# sourceMappingURL=../../../../src/dist/app/controllers/user/userInfo.controller.js.map
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
const typeorm_1 = require("typeorm");
const base_repository_1 = require("../base/base.repository");
const userInfo_entity_1 = require("../../entities/user/userInfo.entity");
let UserInfoRepository = class UserInfoRepository extends base_repository_1.BaseRepository {
    constructor() {
        super();
    }
};
UserInfoRepository = __decorate([
    typeorm_1.EntityRepository(userInfo_entity_1.UserInfo),
    __metadata("design:paramtypes", [])
], UserInfoRepository);
exports.UserInfoRepository = UserInfoRepository;
//# sourceMappingURL=../../../../src/dist/db/repositories/user/userInfo.repository.js.map
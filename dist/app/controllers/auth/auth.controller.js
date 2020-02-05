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
const user_repository_1 = require("../../../db/repositories/user/user.repository");
const errors_1 = require("../../errors");
const services_1 = require("../../../services");
const user_entity_1 = require("./../../../db/entities/user/user.entity");
const user_controller_1 = require("../user/user.controller");
let AuthController = class AuthController {
    constructor(userRepository, userController, jwtService) {
        this.userRepository = userRepository;
        this.userController = userController;
        this.jwtService = jwtService;
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = userData;
            const dupUser = yield this.userRepository.checkUser({ email });
            if (dupUser.length > 0) {
                throw new errors_1.UserAlreadyExistsError();
            }
            try {
                const createdUser = yield this.userRepository.insertData(userData);
                delete createdUser.password;
                return createdUser;
            }
            catch (err) {
                if (err.name === 'QueryFailedError') {
                    throw new errors_1.UserAlreadyExistsError('User with this credentials already exists');
                }
                else {
                    throw new routing_controllers_1.InternalServerError(err);
                }
            }
        });
    }
    login(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = loginData;
            const user = yield this.userRepository
                .createQueryBuilder('user')
                .addSelect('user.password')
                .where('user.username = :username', { username })
                .getOne();
            if (!user) {
                throw new errors_1.UserNotFoundError('User with this credentials not found');
            }
            const passwordIsCorrect = yield user.checkPassword(password);
            if (!passwordIsCorrect) {
                throw new errors_1.WrongPasswordError();
            }
            const _user = yield this.userController.byId(user.uuid);
            const accessToken = yield this.jwtService.makeAccessToken(_user.data);
            return {
                accessToken,
            };
        });
    }
};
__decorate([
    routing_controllers_1.HttpCode(201),
    routing_controllers_1.Post('/register'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    routing_controllers_1.HttpCode(201),
    routing_controllers_1.Post('/login'),
    __param(0, routing_controllers_1.Body({ validate: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    routing_controllers_1.JsonController('/auth'),
    __param(0, typeorm_typedi_extensions_1.InjectRepository()),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_controller_1.UserController,
        services_1.JWTService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=../../../../src/dist/app/controllers/auth/auth.controller.js.map
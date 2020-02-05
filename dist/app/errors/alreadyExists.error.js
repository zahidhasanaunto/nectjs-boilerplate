"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
class UserAlreadyExistsError extends routing_controllers_1.BadRequestError {
    constructor(message = "User already exists") {
        super(message);
        this.name = "UserAlreadyExistsError";
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
//# sourceMappingURL=../../../src/dist/app/errors/alreadyExists.error.js.map
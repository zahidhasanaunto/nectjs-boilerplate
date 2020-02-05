"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
class UserNotFoundError extends routing_controllers_1.NotFoundError {
    constructor(message = "User not found") {
        super(message);
        this.name = "UserNotFoundError";
    }
}
exports.UserNotFoundError = UserNotFoundError;
//# sourceMappingURL=../../../src/dist/app/errors/userNotFound.error.js.map
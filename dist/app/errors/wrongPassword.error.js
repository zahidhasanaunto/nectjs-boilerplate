"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
class WrongPasswordError extends routing_controllers_1.ForbiddenError {
    constructor() {
        super("Password mismatch");
        this.name = "WrongPasswordError";
    }
}
exports.WrongPasswordError = WrongPasswordError;
//# sourceMappingURL=../../../src/dist/app/errors/wrongPassword.error.js.map
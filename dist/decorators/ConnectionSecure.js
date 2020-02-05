"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ConnectionSecure(excludeMethods) {
    return function ConnectionSecure(constructor) {
        const keys = Object.keys(constructor.prototype);
        for (const key in keys) {
            if (keys[key]) {
                const methodKey = keys[key];
                const original = constructor.prototype[methodKey];
                if (excludeMethods.indexOf(methodKey) > -1) {
                    continue;
                }
                constructor.prototype[methodKey] = function () {
                    if (!this.connection) {
                        throw new Error(`Cannot execute method ${methodKey}(). Please check if you have database connection`);
                    }
                    return original.apply(this, arguments);
                };
            }
        }
    };
}
exports.ConnectionSecure = ConnectionSecure;
//# sourceMappingURL=../../src/dist/decorators/ConnectionSecure.js.map
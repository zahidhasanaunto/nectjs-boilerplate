"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSingleDataPlaceholder(payload) {
    const data = {
        message: `Get Single Data Success`,
        success: true,
        data: payload.length > 0 ? payload[0] : null
    };
    return data;
}
exports.getSingleDataPlaceholder = getSingleDataPlaceholder;
function insertDataPlaceholder(payload) {
    const data = {
        message: `Insert Data Success`,
        success: true,
        data: payload
    };
    return data;
}
exports.insertDataPlaceholder = insertDataPlaceholder;
function updateDataPlaceholder(payload) {
    const data = {
        message: `Update Data Success`,
        success: true,
        data: payload.length > 0 ? payload[0] : null
    };
    return data;
}
exports.updateDataPlaceholder = updateDataPlaceholder;
function deleteDataPlaceholder(payload) {
    const data = {
        message: `Delete Data Success`,
        success: true,
        data: payload
    };
    return data;
}
exports.deleteDataPlaceholder = deleteDataPlaceholder;
//# sourceMappingURL=../../src/dist/utils/responsePlaceholder.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function paginate(options, payload) {
    const page = Number(options.page) ? Number(options.page) : 1;
    const take = Number(options.take) ? Number(options.take) : 10;
    const skip = page === 1 ? 0 : (page - 1) * take;
    const data = {
        message: `Get Data Success`,
        take: options.take ? Number(options.take) : 10,
        skip,
        page,
        total: payload[1],
        data: payload[0]
    };
    return data;
}
exports.paginate = paginate;
function paginateAll(payload) {
    const data = {
        message: `Get Data Success`,
        take: 'all',
        skip: false,
        page: false,
        total: payload.length,
        data: payload
    };
    return data;
}
exports.paginateAll = paginateAll;
function paginationOptions(options) {
    const page = Number(options.page) ? Number(options.page) : 1;
    const take = Number(options.take) ? Number(options.take) : 10;
    const skip = page === 1 ? 0 : (page - 1) * take;
    const data = {
        take,
        skip
    };
    return data;
}
exports.paginationOptions = paginationOptions;
//# sourceMappingURL=../../src/dist/utils/paginate.util.js.map
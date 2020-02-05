"use strict";
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
const typeorm_1 = require("typeorm");
const utils_1 = require("../../../utils");
class BaseRepository extends typeorm_1.Repository {
    constructor() {
        super();
    }
    getDataAll(options, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options.take && options.take === 'all') {
                delete options.take;
                delete options.page;
                options.where = Object.assign({}, options);
                options.relations = relations;
                const payload = yield this.find(options);
                return utils_1.paginateAll(payload);
            }
            else {
                const pOptions = utils_1.paginationOptions(options);
                pOptions.where = Object.assign({}, options);
                if (relations) {
                    pOptions.relations = relations;
                }
                const payload = yield this.findAndCount(pOptions);
                return utils_1.paginate(pOptions, payload);
            }
        });
    }
    getDataById(uuid, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {};
            if (relations) {
                options.relations = relations;
            }
            const payload = yield this.findByIds([uuid], options);
            return utils_1.getSingleDataPlaceholder(payload);
        });
    }
    insertData(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield this.save(options);
            return utils_1.insertDataPlaceholder(payload);
        });
    }
    updateData(uuid, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const _payload = yield this.update(uuid, options);
            const payload = yield this.findByIds([uuid]);
            return utils_1.updateDataPlaceholder(payload);
        });
    }
    deleteData(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield this.delete(uuid);
            return utils_1.deleteDataPlaceholder(payload);
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=../../../../src/dist/db/repositories/base/base.repository.js.map
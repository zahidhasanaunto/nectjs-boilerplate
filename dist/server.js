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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const typedi_1 = require("typedi");
const app_1 = require("./app/app");
const database_1 = require("./db/database");
const utils_1 = require("./utils");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = typedi_1.Container.get(app_1.App).getApp();
const database = typedi_1.Container.get(database_1.Database);
database.connect().then(() => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(PORT, () => {
        utils_1.logger.info(`Server started at http://localhost:${PORT}`);
    });
}));
process.on('SIGINT', () => {
    database
        .disconnect()
        .then(() => {
        process.exit(0);
    })
        .catch(_err => {
        process.exit(1);
    });
});
//# sourceMappingURL=../src/dist/server.js.map
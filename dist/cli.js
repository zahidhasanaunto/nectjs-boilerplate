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
const commander_1 = __importDefault(require("commander"));
const shelljs_1 = require("shelljs");
const typedi_1 = require("typedi");
const database_1 = require("./db/database");
const db = typedi_1.Container.get(database_1.Database);
commander_1.default.version('0.0.1', '-v --version');
commander_1.default
    .command('db:reset')
    .description('Resets database based on NODE_ENV')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.connect();
        yield db.reset();
        yield db.disconnect();
        console.log('Database successfully reseted');
    }
    catch (err) {
        throw new Error(`Cannot reset database. Error: ${err}`);
    }
}));
commander_1.default.command('migrations:up').action(() => {
    shelljs_1.exec(`typeorm migrations:run`, (code, stdout, stderr) => {
        if (stderr) {
            console.log('migration error:', stderr);
            return;
        }
        console.log('migration output:', stdout);
    });
});
commander_1.default.command('migrations:down').action(() => {
    shelljs_1.exec(`typeorm migrations:revert`, (code, stdout, stderr) => {
        if (stderr) {
            console.log('migration error:', stderr);
            return;
        }
        console.log('migration output:', stdout);
    });
});
commander_1.default.command('migrations:create <name>').action((name) => {
    shelljs_1.exec(`typeorm migrations:create -n ${name}`, (code, stdout, stderr) => {
        if (stderr) {
            console.log('migration error:', stderr);
            return;
        }
        console.log('migration output:', stdout);
    });
});
commander_1.default.command('migrations:generate <name>').action((name) => {
    shelljs_1.exec(`typeorm migrations:generate -n ${name}`, (code, stdout, stderr) => {
        if (stderr) {
            console.log('migration error:', stderr);
            return;
        }
        console.log('migration output:', stdout);
    });
});
commander_1.default.command('*').action(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('No command has been catched please use -h for display all commands');
}));
commander_1.default.parse(process.argv);
//# sourceMappingURL=../src/dist/cli.js.map
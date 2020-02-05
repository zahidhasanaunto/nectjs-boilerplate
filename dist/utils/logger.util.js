"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const winston_1 = require("winston");
const { combine, colorize, timestamp, printf } = winston_1.format;
const logDir = 'logs';
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const logFormat = printf(info => `[${info.timestamp}] [${info.level}]: ${info.message}`);
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir);
}
const logger = winston_1.createLogger({
    level: DEVELOPMENT ? 'debug' : 'info',
    format: combine(timestamp(), winston_1.format.json()),
    transports: [
        new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'logs/logs.log' })
    ]
});
exports.logger = logger;
if (DEVELOPMENT) {
    logger.add(new winston_1.transports.Console({
        format: combine(colorize(), timestamp(), logFormat)
    }));
}
//# sourceMappingURL=../../src/dist/utils/logger.util.js.map
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
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const env = process.env;
const pool = new pg_1.Pool({
    host: env.DB_HOST,
    user: env.DB_USER,
    database: env.DB,
    password: env.DB_PASSWORD,
    port: parseInt(env.DB_PORT ? env.DB_PORT : '5432'),
});
function postAdmin(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        yield pool.query('INSERT INTO users.admin (username, password)\
         VALUES ($1, $2)', [username, hashedPassword]);
    });
}
try {
    postAdmin("nicole", "02fMejOtzlCe1LHQ43e5vFB85LbrNErQ");
}
catch (error) {
    console.log(error);
}
exports.default = pool;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env;
const pool = new pg_1.Pool({
    host: env.DB_HOST,
    user: env.DB_USER,
    database: env.DB,
    password: env.DB_PASSWORD,
    port: parseInt(env.DB_PORT ? env.DB_PORT : '5432'),
});
exports.default = pool;

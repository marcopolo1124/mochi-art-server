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
exports.deleteAdmin = exports.updateAdminPassword = exports.getAdminByUsername = void 0;
const pool_1 = __importDefault(require("./pool"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function getAdminByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adminUser = yield pool_1.default.query('SELECT * FROM users.admin WHERE username=$1', [username]);
            if (adminUser.rows.length > 0) {
                return adminUser.rows[0];
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getAdminByUsername = getAdminByUsername;
function postAdmin(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        yield pool_1.default.query('INSERT INTO users.admin (username, password)\
         VALUES ($1, $2)', [username, hashedPassword]);
    });
}
function updateAdminPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = bcrypt_1.default.hash(password, salt);
        yield pool_1.default.query('UPDATE users.admin SET password = $2 WHERE username = $1', [username, hashedPassword]);
        res.status(200).send({ message: 'password updated' });
    });
}
exports.updateAdminPassword = updateAdminPassword;
function deleteAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username } = req.body;
        yield pool_1.default.query('DELETE FROM users.admin WHERE username = $1', [username]);
        res.status(204);
    });
}
exports.deleteAdmin = deleteAdmin;

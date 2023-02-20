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
const LocalStrategy = require('passport-local').Strategy;
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_1 = require("../db/admin");
function initialize(passport) {
    return __awaiter(this, void 0, void 0, function* () {
        const authenticateUser = (username, password, done) => __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, admin_1.getAdminByUsername)(username);
            if (user === null) {
                return done(null, false, { message: 'No user with that email' });
            }
            try {
                if (yield bcrypt_1.default.compare(password, user.password)) {
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            }
            catch (e) {
                return done(e);
            }
        });
        passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
        passport.serializeUser((user, done) => { done(null, user.username); });
        passport.deserializeUser((username, done) => __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, admin_1.getAdminByUsername)(username);
            done(null, { username: user.username });
        }));
    });
}
exports.default = initialize;

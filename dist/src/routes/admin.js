"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
function Admin(passport) {
    const admin = express_1.default.Router();
    admin.get('/user', (req, res) => {
        res.send({ user: req.user, message: 'test' });
    });
    admin.get('/', (req, res) => {
        res.render('login.ejs');
    });
    admin.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            if (err !== null)
                return res.status(500).send({ message: 'error Server error' });
            if (!user)
                return res.status(404).send({ message: 'User not found' });
            else {
                req.login(user, error => {
                    if (error)
                        res.status(500).send({ message: 'Server error', error: JSON.stringify(err) });
                    res.send({ message: 'Successfully Authenticated' });
                });
            }
        })(req, res, next);
    });
    admin.delete('/logout', (req, res) => {
        req.logOut((err) => {
            if (err) {
                res.status(500).send({ message: "Failed to logout", err });
                return;
            }
            res.status(204).send({ message: "Successfully logged out" });
        });
    });
    return admin;
}
exports.default = Admin;

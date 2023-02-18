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
exports.updateCommissionStatus = exports.postCommission = exports.getCommission = exports.getCommissionsWithStatus = void 0;
const pool_1 = __importDefault(require("./pool"));
const crypto_1 = __importDefault(require("crypto"));
function getCommissionsWithStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { status, perPage, orderBy, page } = req.query;
        const query = `SELECT * FROM commissions.commissions ${status ? "WHERE commission_status=$4" : ""} ORDER BY $1 OFFSET $2 LIMIT $3`;
        const bindVarBase = [orderBy, perPage * (page - 1), perPage];
        const bindVar = status ? [...bindVarBase, status] : bindVarBase;
        try {
            const rowCount = pool_1.default.query('SELECT COUNT(*) FROM commissions.commissions');
            const commissions = yield pool_1.default.query(query, bindVar);
            //
            res.send({ commissions: commissions.rows, rowCount: (yield rowCount).rows[0].count });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getCommissionsWithStatus = getCommissionsWithStatus;
function getCommission(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const images = pool_1.default.query('SELECT * FROM commissions.commission_images WHERE commission_id=$1', [id]);
            const commission = yield pool_1.default.query('SELECT * FROM commissions.commissions WHERE id=$1', [id]);
            if (commission.rows.length > 0) {
                res.send({
                    commission: commission.rows[0],
                    images: (yield images).rows
                });
            }
            else {
                res.status(404).send({
                    commission: null,
                    images: []
                });
            }
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getCommission = getCommission;
function postCommission(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const images = req.files;
        try {
            const { name, email, characterName, numberOfCharacters, scope, comType, details } = req.body;
            const id = crypto_1.default.randomUUID();
            yield pool_1.default.query("INSERT INTO commissions.commissions (id, name, email, character_name, number_of_characters, scope, com_type, details)\
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [id, name, email, characterName, numberOfCharacters, scope, comType, details]);
            // const promises = []
            (_a = images.references) === null || _a === void 0 ? void 0 : _a.forEach((reference) => {
                pool_1.default.query("INSERT INTO commissions.commission_images (commission_id, file_name)\
                 VALUES ($1, $2)", [id, reference.filename]);
            });
            // await Promise.all(promises)
            res.status(201).send({ message: 'commission pending' });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.postCommission = postCommission;
function updateCommissionStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { commission_id, status } = req.body;
            if (!commission_id || !status) {
                const err = new Error("missing information");
                next(err);
            }
            const updateReq = yield pool_1.default.query("UPDATE commissions.commissions SET commission_status=$2 WHERE id=$1", [commission_id, status]);
            res.send({ message: "updated" });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.updateCommissionStatus = updateCommissionStatus;

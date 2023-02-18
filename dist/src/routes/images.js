"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.GALLERY_PATH ? process.env.GALLERY_PATH : "../gallery_images");
    },
    filename: (req, file, cb) => {
        const fileName = crypto_1.default.randomUUID() + path_1.default.extname(file.originalname);
        cb(null, fileName);
        req.fileName = fileName;
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const images = express_1.default.Router();
images.get('/', db_1.default.getGallery);
images.get('/featured', db_1.default.getFeatured);
images.get('/:fileName', db_1.default.getImage);
images.post('/upload', upload.single('image'), db_1.default.postImage);
images.delete('/delete', db_1.default.deleteImage);
exports.default = images;

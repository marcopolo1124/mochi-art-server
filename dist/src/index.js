"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const site_state_1 = __importDefault(require("./routes/site_state"));
const images_1 = __importDefault(require("./routes/images"));
const admin_1 = __importDefault(require("./routes/admin"));
const comissions_1 = __importDefault(require("./routes/comissions"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const passport = require("passport");
const express_session_1 = __importDefault(require("express-session"));
const passport_config_1 = __importDefault(require("./routes/passport-config"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const secret = process.env.SESSION_SECRET;
app.use((0, express_session_1.default)({
    secret: secret ? secret : 'secret',
    resave: false,
    saveUninitialized: false,
    name: "miiya",
    cookie: {
        sameSite: 'none',
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: true,
    }
}));
const port = process.env.PORT;
(0, passport_config_1.default)(passport);
app.use((req, res, next) => { console.log(req.session); next(); });
app.use(passport.initialize());
app.use(passport.session());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: 'https://miiyachi-art-store.vercel.app',
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use('/state', site_state_1.default);
app.use('/images', images_1.default);
app.use('/commissions', comissions_1.default);
app.use('/admin', (0, admin_1.default)(passport));
const gallery = process.env.GALLERY_PATH ? process.env.GALLERY_PATH : "../gallery_images";
const commission = process.env.COMMISSION_PATH ? process.env.COMMISSION_PATH : "../commission_images";
if (!fs_1.default.existsSync(gallery)) {
    console.log("making directory gallery");
    fs_1.default.mkdirSync(gallery);
}
if (!fs_1.default.existsSync(commission)) {
    console.log("making directory commission");
    fs_1.default.mkdirSync(commission);
}
app.use('/static-gallery', express_1.default.static(gallery));
app.use('/static-commission', express_1.default.static(commission));
app.set("view_engine", "ejs");
app.get('/', (req, res) => {
    res.send({ message: 'Server is up' });
});
app.get('/test', (req, res) => {
    res.render('upload.ejs');
});
app.get('/references', (req, res) => {
    res.render('commissions.ejs');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

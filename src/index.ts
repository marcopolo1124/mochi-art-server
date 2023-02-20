import express, { Express, Request, Response } from 'express';
import site_state from './routes/site_state';
import images from './routes/images';
import Admin from './routes/admin'
import commissions from './routes/comissions'
import dotenv from 'dotenv';
import cors from 'cors'
import passport = require('passport');
import session from 'express-session'
import initialize from './routes/passport-config'
import fs from 'fs'
import cookieSession from 'cookie-session'

dotenv.config();
const app: Express = express();
const secret = process.env.SESSION_SECRET
const port = process.env.PORT;
initialize(passport)



app.use(express.urlencoded( {extended: false} ))
// app.use(session({
//   secret: secret?secret: 'secret',
//   resave: false,
//   saveUninitialized: false,
//   // cookie: {
//   //   sameSite: 'none',
//   //   maxAge: 60 * 60 * 24,
//   //   secure: true,
//   // }
// }))
app.use(cookieSession({
  secret: secret?secret: 'secret',
  sameSite: 'none',
  maxAge: 60 * 60 * 24,
  secure: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

app.use(cors({
  origin: 'https://miiyachi-art-store.vercel.app',
  optionsSuccessStatus: 200,
  credentials: true,
}
))
app.use('/state', site_state)
app.use('/images', images)
app.use('/commissions', commissions)
app.use('/admin', Admin(passport))
const gallery = process.env.GALLERY_PATH?process.env.GALLERY_PATH: "../gallery_images"
const commission = process.env.COMMISSION_PATH?process.env.COMMISSION_PATH: "../commission_images"

if (!fs.existsSync(gallery)){
  console.log("making directory gallery")
  fs.mkdirSync(gallery)
}

if (!fs.existsSync(commission)){
  console.log("making directory commission")
  fs.mkdirSync(commission)
}

app.use('/static-gallery', express.static(gallery))
app.use('/static-commission', express.static(commission))


app.set("view_engine", "ejs")
app.get('/', (req: Request, res: Response) => {
  res.send({message: 'Server is up'});
});


app.get('/test', (req, res) => {
  res.render('upload.ejs')
})

app.get('/references', (req, res) => {
  res.render('commissions.ejs')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
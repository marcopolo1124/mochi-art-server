const LocalStrategy = require('passport-local').Strategy
import bcrypt from 'bcrypt'
import { getAdminByUsername } from "../db/admin"
import {PassportStatic} from 'passport'

async function initialize(passport: PassportStatic) {
    const authenticateUser = async (username:string, password:string, done:Function) => {
        const user = await getAdminByUsername(username)
        if (user === null) {
            return done(null, false, {message: 'No user with that email'})
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else{
                return done(null, false, { message: 'Password incorrect'})
            }
        } catch(e) {
            return done(e)
        }
    }
    passport.use(
        new LocalStrategy(
            {usernameField: 'username'},
            authenticateUser)
    )
    passport.serializeUser((user: any, done) => {done(null, user.username)})
    passport.deserializeUser(async (username: string, done) => {
        const user = await getAdminByUsername(username)
        done(null, {username: user.username})})   
}

export default initialize
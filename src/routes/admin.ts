import db from '../db'

import express from 'express'
import { PassportStatic } from 'passport'

export default function Admin(passport: PassportStatic){
    const admin = express.Router()
    admin.get('/user', (req, res)=> {
        res.send({user: req.user, message:'test'})
    })
    
    admin.get('/', (req, res) =>{
        res.render('login.ejs')
    })
    
    admin.post(
        '/login',
        (req, res, next) => {
            passport.authenticate(
                'local', (err: any, user: any) => {
                    if (err) {
                        res.status(500).send({message: 'Server error'})
                        return
                    }
                    if (!user) {
                        res.status(404).send({message: 'User not found'})
                        return
                    }
                    else {
                        req.login(user, err => {
                            if (err) {
                                res.status(500).send({message: 'Server error', error: JSON.stringify(err)})
                                return
                            }
                            res.send({message: 'Successfully Authenticated'})
                            return
                        })
                    }
                }
            )(req, res, next)
        }
    )
    admin.delete('/logout', (req, res) => {
        req.logOut((err) => {
            if (err){
                res.status(500).send({message: "Failed to logout", err})
                return
            }
            res.status(204).send({message: "Successfully logged out"})
        })
        
    })
    return admin
}
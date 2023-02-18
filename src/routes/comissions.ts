import db from '../db'
import express from 'express'
import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.COMMISSION_PATH?process.env.COMMISSION_PATH: "../commission_images")
    },
    filename: (req, file, cb) =>{
        const fileName = crypto.randomUUID() + path.extname(file.originalname)
        cb(null, fileName)
    }
})

const upload = multer({storage: storage})

const multipleUpload = upload.fields([{name: 'references'}])

const commissions = express.Router()
commissions.get('/', db.getCommissionsWithStatus)
commissions.get('/:id', db.getCommission)
commissions.post('/upload', multipleUpload, db.postCommission)
commissions.patch('/status', db.updateCommissionStatus)

export default commissions
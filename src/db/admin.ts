import pool from "./pool";
import bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express'

export async function getAdminByUsername(username: string) {
    try {
        const adminUser = await pool.query(
            'SELECT * FROM users.admin WHERE username=$1'
            , [username]
        )

        if (adminUser.rows.length > 0){
            return adminUser.rows[0]
        } else{
            return null
        }
    }catch (err){
        console.log(err)
    }
}

async function postAdmin(username: string, password: string){
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    await pool.query(
        'INSERT INTO users.admin (username, password)\
         VALUES ($1, $2)'
        , [username, hashedPassword]
    )
}

export async function updateAdminPassword(req: Request, res: Response, next: NextFunction){
    const {username, password} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hash(password, salt)
    await pool.query(
        'UPDATE users.admin SET password = $2 WHERE username = $1',
        [username, hashedPassword]
    )
    res.status(200).send({message: 'password updated'})
}

export async function deleteAdmin(req: Request, res: Response){
    const {username} = req.body
    await pool.query(
        'DELETE FROM users.admin WHERE username = $1',
        [username]
    )
    res.status(204)
}
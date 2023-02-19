import {Pool} from 'pg'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()
const env = process.env

const pool = new Pool({
    host: env.DB_HOST,
    user: env.DB_USER,
    database: env.DB,
    password: env.DB_PASSWORD,
    port: parseInt(env.DB_PORT? env.DB_PORT : '5432'),
    ssl: true,
})

async function postAdmin(username: string, password: string){
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    await pool.query(
        'INSERT INTO users.admin (username, password)\
         VALUES ($1, $2)'
        , [username, hashedPassword]
    )
}


export default pool
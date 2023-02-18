import {Pool} from 'pg'
import dotenv from 'dotenv'
dotenv.config()
const env = process.env

const pool = new Pool({
    host: env.DB_HOST,
    user: env.DB_USER,
    database: env.DB,
    password: env.DB_PASSWORD,
    port: parseInt(env.DB_PORT? env.DB_PORT : '5432'),
})

export default pool
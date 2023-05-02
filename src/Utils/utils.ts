import * as DB from './DB/db'
import * as crypto from './crypto/crypto'
import { Pool } from 'pg'

export const DBpool = new Pool({
    database: process.env['dbname'],
    user: process.env['dbuser'],
    password: process.env['dbpw'],
    port: Number(process.env['dbport']),
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
}) 
     

export default DBpool
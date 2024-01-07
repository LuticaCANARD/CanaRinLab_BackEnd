import { DB } from '../TYPES/types'
import { createPool } from 'mysql2' // do not use 'mysql2/promises'!
import { Kysely, MysqlDialect } from 'kysely'

const dialect = new MysqlDialect({
	pool: createPool(process.env['DATABASE_URL'])
})


export const db:Kysely<DB> = new Kysely<DB>({
	dialect
})

export const DBRaw = createPool({
	database: process.env['DB_NAME'],
	host: process.env['DB_HOST'],
	user: process.env['DB_ID'],
	password: process.env['DB_PW'],
	port: Number(process.env['DB_PORT']),
	isServer : true
})

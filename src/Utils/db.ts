import { DB } from '../../prisma/generated/types'
import { createPool } from 'mysql2' // do not use 'mysql2/promises'!
import { Kysely, MysqlDialect } from 'kysely'

const dialect = new MysqlDialect({
	pool: createPool({
		database: process.env['DB_NAME'],
		host: process.env['DB_HOST'],
		user: process.env['DB_ID'],
		password: process.env['DB_PW'],
		port: Number(process.env['DB_PORT'])
	})
})


export const db = new Kysely<DB>({
	dialect
})

export const DBRaw = createPool({
	database: process.env['DB_NAME'],
	host: process.env['DB_HOST'],
	user: process.env['DB_ID'],
	password: process.env['DB_PW'],
	port: Number(process.env['DB_PORT'])
})
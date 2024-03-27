import { DB } from '../TYPES/types'
import { Kysely } from 'kysely'
import { XataDialect, Model } from '@xata.io/kysely';
import { DatabaseSchema, getXataClient } from 'xata'; // Generated client


export const db:Kysely<DB> = new Kysely<DB>({
	dialect
})

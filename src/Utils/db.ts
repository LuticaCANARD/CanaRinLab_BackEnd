import { DB } from '../TYPES/types'
import { Kysely } from 'kysely'
import { XataDialect, Model } from '@xata.io/kysely';
import { DatabaseSchema, getXataClient } from '../util/xataclient'; // Generated client
const xata = getXataClient();

export const db:Kysely<DB> = new Kysely<DB>({
	dialect : new XataDialect({xata})
})

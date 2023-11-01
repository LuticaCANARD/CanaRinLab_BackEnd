import { db } from "./Utils/db";
import { sql } from "kysely";





console.log('DB HELTH CHECK START!')
await db.executeQuery(sql`SELECT * FROM ServerPref;`.compile(db));
console.log('DB HELTH CHECK WAS COMPLETE !')

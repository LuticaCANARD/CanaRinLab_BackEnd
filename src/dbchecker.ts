import { db } from "./Utils/db";
import { sql } from "kysely";




export const heartbeat = async()=>{
    console.log('DB HELTH CHECK START!')
    await db.executeQuery(sql`SELECT * FROM ServerPref;`.compile(db));
    console.log('DB HELTH CHECK WAS COMPLETE !')
}


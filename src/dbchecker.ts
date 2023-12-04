import { db } from "./Utils/db";
import { db_temp } from "./Utils/db";

import { sql } from "kysely";




export const heartbeat = async()=>{
    console.log('DB HELTH CHECK START!')
    await db.executeQuery(sql`SELECT * FROM ServerPref;`.compile(db));
    if(db_temp != '') 
        db_temp.promise().query('SELECT * FROM user ORDER BY id LIMIT 1',[]).then();
    console.log('DB HELTH CHECK WAS COMPLETE !')

}


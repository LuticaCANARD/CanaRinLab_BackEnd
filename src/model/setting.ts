import { db } from '../Utils/db';

export const GetSetting = async (settingname) =>{
    return await db.selectFrom("ServerPref")
    .select("value")
	.where("ServerPref.prefKey","=",settingname)
    .execute();
}

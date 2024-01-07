import { db } from '../Utils/db';

export const GetCasinoChatters = async(guildId) =>{
    return await db.
		selectFrom("CasinoChat")
		.where("CasinoChat.id","=",guildId)
		.select("CasinoChat.chatId")
		.execute();
}

export const GetCasinoRole = async () =>{
    return await db.selectFrom("CasinoRoles")
    .select(["CasinoRoles.RoleName","CasinoRoles.userId","CasinoRoles.Priority"])
    .orderBy("CasinoRoles.Priority").execute();
}
export const GetMemberName = async (memberids)=>{
    return await db.selectFrom("CasinoMember")
    .where("CasinoMember.userId","in",memberids)
    .select(["CasinoMember.name","CasinoMember.userId"]).execute();
}
import {db} from '../Utils/db'

export const saveRequest =async (username:string,user_contact:string,desc:string) => {
    await db.insertInto("ProjectAnswer").values({name:username,contact:user_contact,desc}).execute();
}

export const loadAnswer =async (id:Array<number>) => {
    return db.selectFrom("ProjectAnswer").select(["ProjectAnswer.desc","ProjectAnswer.name"]).where("ProjectAnswer.id","in",id).execute();
}
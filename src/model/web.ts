import {db} from '../Utils/db'

export const saveRequest =async (username:string,user_contact:string,desc:string) => {
    await db.insertInto("ProjectAnswer").values({name:username,contact:user_contact,desc}).execute();
console.log('s')
    return await db.selectFrom("ProjectAnswer").select(["ProjectAnswer.id"]).where('ProjectAnswer.contact','=',user_contact).orderBy("ProjectAnswer.id","desc").limit(1).execute();
}

export const loadAnswer =async (id:Array<number>) => {
    return db.selectFrom("ProjectAnswer").select(["ProjectAnswer.desc","ProjectAnswer.name","ProjectAnswer.contact","ProjectAnswer.createAt"]).where("ProjectAnswer.id","in",id).execute();
}
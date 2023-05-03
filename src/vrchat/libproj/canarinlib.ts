import { Pool } from "pg";
import fs from "fs";

let sup_langs = require('../../../public/supportlang.json').langs;
export async function loadBook(request:object,db:Pool):Promise<object>
{
    let bookcode = Number(request['bookcode'])
    let language:string = request['language']

    if (language.length > 2 ){
        let result = {'error' : -3}
        return result
    }
    else if (sup_langs.indexOf(language) === -1){
        language = 'en'
    }
    let book_info = {}
    try{
        fs.readFile(`../../../public/${request['bookcode']}_${request['language']}.html`,(err, data) => {
            book_info['bookinside'] = data.toString()})
    }
    catch(err)
    {
        let result = {'error' : -2}
        return result 
    }
    return book_info;
}

export async function loadLibs(request:object,db:Pool):Promise<object>
{
    let language:string = request['language']
    if (language.length > 2 ){
        let result = {'error' : -3}
        return result
    }
    else if (sup_langs.indexOf(language) === -1){
        language = 'en'
    }
    let book_infos = await db.query(`SELECT code,bookname,auther FROM tb_bookinfo WHERE lang = $1 `,[language])
    let book_info = book_infos.rows
    return book_info;
}
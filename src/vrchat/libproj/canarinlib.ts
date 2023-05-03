import { Pool } from "pg";
import fs from "fs/promises";

let sup_langs = require('../../../public/supportlang.json').langs;
export async function loadBook(request:object,db:Pool):Promise<object>
{
    let bookcode = Number(request['bookcode'])
    let language:string = request['language']
    // 그런데, 제목을 불러오는 것도 방법이 될 것이다.
    // 캐싱을 통하여, SQL은 최소로 부르자.
    if (language.length > 2 ){
        let result = {'error' : -3}
        return result
    }
    else if (sup_langs.indexOf(language) === -1){
        language = 'en'
    }
    let book_info = {}
    try{
        let read =await fs.readFile(`./public/${request['language']}/${bookcode}.html`)
        book_info['bookinside'] = read.toString()
           
    }
    catch(err)
    {
        console.log(err)
        let result = {'error' : -2}
        return result 
    }
    console.log(book_info)
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
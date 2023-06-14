import { Pool } from "pg";
import fs from "fs/promises";

let cache_codes = {}
let sup_langs = require('../../../public/supportlang.json').langs;
export async function loadBook(request:object,db:Pool):Promise<object>
{
    let bookcode = Number(request['bookcode'])
    let language:string = request['language']
    // 그런데, 제목을 불러오는 것도 방법이 될 것이다.
    // 캐싱을 통하여, SQL은 최소로 부르자.
    // id : 제목
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
    let book_infos = null
    let book_info = null
    if (cache_codes[language] == undefined)
    { //hit! 무중단 배포를 논해야 한다면 그때 논하라!
        book_infos =  await db.query(`SELECT code,bookname,auther FROM tb_bookinfo WHERE lang = $1 ORDER BY code`,[language])
        cache_codes[language] = book_infos.rows
        book_info = book_infos.rows
    }
    else
    {
        book_info = cache_codes[language]
    }
    return book_info;
}
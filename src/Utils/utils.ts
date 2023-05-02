import * as DB from './DB/db'
import * as crypto from './crypto/crypto'
import { Pool } from 'pg'

export const DBpool = new Pool({
    database: process.env['dbname'],
    user: process.env['dbuser'],
    password: process.env['dbpw'],
    port: Number(process.env['dbport']),
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
}) 
export class RouteResult {
    result:boolean;
    returns:object;
    error_code:null|number;
    error_desc : null|string;
    constructor(result:boolean,ret:object,error_code?:null|number,error_desc?:null|string)
    {
        this.result = result
        this.returns = ret
        this.error_code = error_code
        this.error_desc = error_desc
    }
    toObject():object
    {
        let ret = {"result" : this.result}
        if (this.result)
        {
            ret['ret'] = this.returns
        }
        else
        {
            ret['ret'] = {"desc":this.error_desc}
            ret['error_code'] = this.error_code
        }
        return ret
    }
}
     

export default DBpool
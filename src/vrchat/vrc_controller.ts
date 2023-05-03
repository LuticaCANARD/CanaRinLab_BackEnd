/**
 *  VRChat방향 Back-end이다. 감안하라.
 * 
 *
*/
import * as RinLib from './libproj/canarinlib' // Cana rin Lib project
import * as Utils from '../Utils/utils' // Formally.
export module VrcControl {
    let db = Utils.DBpool
    export async function routeVrcRequest(request:object,route:string):Promise<string>{
        let result:string = ''
        switch(route) 
        {
            case 'test':
                result = 'pong'
                break;
            case 'load_book':
                let load_result = await RinLib.loadBook(request,db)
                if (load_result['error'] == null)
                    result = load_result['bookinside']
                else
                    result = 'there is no book on server!'+load_result['error']
                break
            case 'load_libs':
                load_result = await RinLib.loadLibs(request,db)
                if (load_result['error'] == null)
                    result = load_result['bookinside']
                else
                    result ='there is no book on server!'+load_result['error']
                break
            default :
                result ='There is no command for server!'
                break
        }
        
        return result
    }
    async function insertUserData():Promise<object>
    {
        return 
    }

}
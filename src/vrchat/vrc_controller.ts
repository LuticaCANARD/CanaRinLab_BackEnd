/**
 *  VRChat방향 Back-end이다. 감안하라.
 * 
 *
*/
import * as RinLib from './libproj/canarinlib'
import * as Utils from '../Utils/utils'
export module VrcControl {
    let db = Utils.DBpool
    export async function routeVrcRequest(request:object,route:string):Promise<object>{
        let result:object = {}
        switch(route) 
        {
            case 'test':
                result = new Utils.RouteResult(true,{'test':'open!'}).toObject()
                break;
            case 'insert_user' :
                result = new Utils.RouteResult(true,await insertUserData()).toObject()
                break;
            case 'load_book':
                let load_result = await RinLib.loadBook(request,db)
                if (load_result['error'] == null)
                    result = new Utils.RouteResult(true,load_result).toObject()
                else
                    result = new Utils.RouteResult(false,load_result,load_result['error'],'there is no book on server!'+load_result['error']).toObject()
                break
            case 'load_libs':
                load_result = await RinLib.loadLibs(request,db)
                if (load_result['error'] == null)
                    result = new Utils.RouteResult(true,load_result).toObject()
                else
                    result = new Utils.RouteResult(false,load_result,load_result['error'],'there is en error on load!'+load_result['error']).toObject()
                break
            default :
                result = new Utils.RouteResult(false,{},-1,'There is no command for server!').toObject()
                break
        }
        
        return result
    }
    async function insertUserData():Promise<object>
    {
        return 
    }

}
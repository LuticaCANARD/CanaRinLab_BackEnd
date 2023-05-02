/**
 *  VRChat방향 Back-end이다. 감안하라.
 * 
 *
*/
import * as Utils from '../Utils/utils'
export module VrcControl {
    let db = Utils.DBpool
    export async function routeVrcRequest(request:object,route:string):Promise<object>{
        let result:object = {}
        switch(route) 
        {
            case 'test':
                result = new Utils.RouteResult(true,{'test':'open!'}).toObject()
            case 'insert_user' :
                result = new Utils.RouteResult(true,await insertUserData()).toObject()
            default :
                result = new Utils.RouteResult(false,{},-1,'There is no command for server!').toObject()
        }
        
        return result
    }
    async function insertUserData():Promise<object>
    {

        return 
    }
}
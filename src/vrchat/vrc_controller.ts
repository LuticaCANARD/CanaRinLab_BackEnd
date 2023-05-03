/**
 *  VRChat방향 Back-end이다. 감안하라.
 * 
 *
*/
import * as RinLib from './libproj/canarinlib' // Cana rin Lib project
import * as RinWet from './weatherproj/canarinwet'
import * as Utils from '../Utils/utils' // Formally.
export module VrcControl {
    let db = Utils.DBpool
    export async function routeVrcRequest(request:object,route:string):Promise<object>{
        let result:object = {'ret':'','json':false}
        switch(route) 
        {
            case 'test':
                    result['ret'] = 'pong'
                break;
            case 'load_book':
                let load_result = await RinLib.loadBook(request,db)
                if (load_result['error'] == null)
                    result['ret'] = load_result['bookinside']
                else
                    result['ret'] = 'there is no book on server!'+load_result['error']
                break
            case 'load_libs':
                load_result = await RinLib.loadLibs(request,db)
                if (load_result['error'] == null){
                    result['ret'] = load_result['libs']
                    result['json']=true
                }    
                else
                    result['ret'] ='there is no libs on server!'+load_result['error']
                break
            case 'get_weather':
                load_result = await RinWet.getWeather(request)
            default :
                result['ret'] ='There is no command for server!'
                break
        }
        
        return result
    }
    async function insertUserData():Promise<object>
    {
        return 
    }

}
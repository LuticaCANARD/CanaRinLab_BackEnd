/**
 *  VRChat방향 Back-end이다.
 * 
 *
*/
import * as RinLib from './libproj/canarinlib' // Cana rin Lib project
import * as RinWet from './weatherproj/canarinwet'
import * as Utils from '../Utils/utils' // Formally.
import {LocalHandler,ElysiaInstance,TypedSchema,Context,Handler,Elysia} from 'elysia' // Elysia
import {getWeather} from '../common/weather'

export module VrcControl {
	let db = Utils.DBpool
	//
	export const checkVrcInfo = (context:LocalHandler<TypedSchema<never>, ElysiaInstance, "/vrchat">) => {

	}

}

const VrcGroup = (c:Context<any,any>)=>{
	return {}
};

const SolidTable = (c:Context<any,any>)=>{
	console.log('ss')
	return {}
};
const getWeatherCondiotion = async (c:Context<any,any>) =>{
	const x = BigInt(Number(c.query["x"])),y = BigInt(Number(c.query["y"]));
	const weather = await getWeather(x,y,BigInt(1000))
	console.log(weather["data"]["response"]["header"])
	return weather["data"]["response"]["body"];
}
const getPlayerHeader =  (c:Context<any,any>) =>{
	const v = c.headers;
	console.log(v["x-forwarded-for"]);
	c.set.headers["set-cookie"] = "key=val;";

	if(c.query["fail"]=="1") c.set.status = 400;
	return {
		"something" : "cool!"
	};
}

export const VrcRouter = (app:Elysia <ElysiaInstance>) : Elysia<ElysiaInstance> => {
	app
	.get('/',VrcGroup)
	.get('/SolidTable',SolidTable)
	.get('/weather',getWeatherCondiotion)
	.get('/checker',getPlayerHeader)

	return app;
} 
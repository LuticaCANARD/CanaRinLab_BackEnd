/**
 *  VRChat방향 Back-end이다.
 * 
 *
*/
import * as RinLib from './libproj/canarinlib' // Cana rin Lib project
import * as RinWet from './weatherproj/canarinwet'
import * as Utils from '../Utils/utils' // Formally.
import {Context,Handler,Elysia} from 'elysia' // Elysia
import {getWeather} from '../common/weather'
import { SHA256,CryptoHasher } from 'bun'
import { randomInt } from 'node:crypto'
import {getRailwayTimeTable} from '../common/railway_station'
import {isKoreanHoliday} from '../Utils/get_holiday'

export module VrcControl {
	let db = Utils.DBpool
	//
	export const checkVrcInfo = (context:Context) => {

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
	const hasher = new CryptoHasher("sha256");

	if(v["x-forwarded-for"]!=undefined){
		v["x-forwarded-for"] = hasher.update(v["x-forwarded-for"]).digest("base64");
		v["x-amzn-trace-id"] = "-";
		v["host"] = "-";
		c.set.headers["set-cookie"] = "key="+v["x-forwarded-for"]+';'

	} else {
		c.set.headers["set-cookie"] = "key="+hasher.update("local").digest("base64");+";"
	}
	 
	//console.log(v);
	//c.set.headers["set-cookie"] = "key="+String(SHA256.hash(v["x-forwarded-for"]))+";";
	if(c.query["fail"]=="1") c.set.status = 400;
	return {
		"something" : "cool!"
	};
}

const ImageVRC = (c:Context<any,any>) =>{
	const v = c.headers;
	const hasher = new CryptoHasher("sha256");

	if(v["x-forwarded-for"]!=undefined){
		v["x-forwarded-for"] = hasher.update(v["x-forwarded-for"]).digest("base64");
		// v["x-amzn-trace-id"] = "-";
		// v["host"] = "-";
		c.set.headers["set-cookie"] = "key="+v["x-forwarded-for"]+';'

	} else {
		c.set.headers["set-cookie"] = "key="+hasher.update("local").digest("base64");+";"
	}
	// console.log(v);
	return {};
}

const VRCRailwayTable = async (c:Context<any,any>) =>{
	const loader = ["1277","K326","K327","K329","k330"];
	const g = []
	for(const k of loader) g.push((await getRailwayTimeTable('KR','K4',k,"normal")).data)
	return g;
}

export const VrcRouter = (app:Elysia) : Elysia => {
	app
	.get('/',VrcGroup)
	.get('/SolidTable',SolidTable)
	.get('/weather',getWeatherCondiotion)
	.get('/checker',getPlayerHeader)
	.get("/Image",ImageVRC)
	.get('/railway_table',VRCRailwayTable)

	return app;
} 
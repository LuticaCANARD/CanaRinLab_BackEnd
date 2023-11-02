/**
 * 여기는 웹 API만 다룬다. 프론트는 다른 프로젝트에서 다루게 한다
 */

import {Context,Handler,Elysia} from 'elysia' // Elysia
import {getWeather} from '../common/weather'
import { SHA256,CryptoHasher } from 'bun'
import { randomInt } from 'node:crypto'
import * as Utils from '../Utils/utils'
import {saveRequest,loadAnswer} from '../model/web'

const saveProjectAnswer =async (c:Context<any,any>)=>{
	await saveRequest(c.body["user"],c.body["user_contact"],c.body["desc"])
	return {res:true}
};
const readProjectAnswer =async (c:Context<any,any>)=>{
	const ret = await loadAnswer(c.body["id"])
	return ret;
};

export const webRoute = (app:Elysia <any>) : Elysia<any> => {
	app
	.post('/resume_contact',saveProjectAnswer)
	.get('/read_contact',readProjectAnswer)
	return app;
} 

/** guard 예제용
 * .post('/taketoken',takeToken)
	.post('/register',register)
	.guard({
		beforeHandle: loginGuard
	}, app=>app
		.post('/offtoken',killToken)
		.post('/resume_contact',saveProjectAnswer)
		.get('/read_ticket',readProjectAnswer)
		.delete('/delete_contact',deleteProjectAnswer)
	)
 */
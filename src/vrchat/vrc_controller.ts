/**
 *  VRChat방향 Back-end이다.
 * 
 *
*/
import * as RinLib from './libproj/canarinlib' // Cana rin Lib project
import * as RinWet from './weatherproj/canarinwet'
import * as Utils from '../Utils/utils' // Formally.
import {LocalHandler,ElysiaInstance,TypedSchema,Context,Handler,Elysia} from 'elysia' // Elysia
export module VrcControl {
	let db = Utils.DBpool
	//
	export const checkVrcInfo = (context:LocalHandler<TypedSchema<never>, ElysiaInstance, "/vrchat">) => {

	}

}

const VrcGroup = (c:{ body, set })=>{
	console.log('ss')
	return {}
}

const SolidTable = (c:{ body, set })=>{
	console.log('ss')
	return {}
}

export const VrcRouter = (app:Elysia <ElysiaInstance>) : Elysia<ElysiaInstance> => {
	app
	.get('/',VrcGroup)
	.get('/SolidTable',SolidTable)

	return app;
} 
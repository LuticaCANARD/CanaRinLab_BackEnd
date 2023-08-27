import * as Utils from '../Utils/utils' // Formally.
import {LocalHandler,ElysiaInstance,TypedSchema,Context,Handler,Elysia} from 'elysia' // Elysia
import { swagger } from '@elysiajs/swagger'


const discordInit = async ({ body, set }) =>{

	if(body["type"] == 1){
		set.status = 200;
		return {
			type:1
		};
	}

}

export const DiscordRouter = (app:Elysia <ElysiaInstance>) :Elysia<ElysiaInstance> => {
	app
	.post('/',discordInit)
	return app;
}  
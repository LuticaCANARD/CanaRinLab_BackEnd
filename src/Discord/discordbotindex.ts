import * as Utils from '../Utils/utils' // Formally.
import {LocalHandler,ElysiaInstance,TypedSchema,Context,Handler,Elysia} from 'elysia' // Elysia
import { swagger } from '@elysiajs/swagger'


const discordInit = async ({ body, set }) =>{

	set.status = 200;
	return {
		test:"var"
	};
}

export const DiscordRouter = (app:Elysia <ElysiaInstance>) :Elysia<ElysiaInstance> => {
	app
	.get('/',discordInit)
	return app;
} 
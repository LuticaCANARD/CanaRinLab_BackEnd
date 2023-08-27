import {Context,TypedSchema,ws,Elysia,ElysiaInstance} from 'elysia'
import {WSTypedSchema,ElysiaWSOptions} from 'elysia/dist/ws'


export const discordWsRouter: ElysiaWSOptions<string, WSTypedSchema<never>, {}> = {
	message(ws,message) {
		ws.send(message);
	}
}
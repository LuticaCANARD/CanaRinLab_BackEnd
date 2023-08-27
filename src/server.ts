import { createServer } from "http";
import { WebSocket } from "ws";
import { VrcRouter } from "./vrchat/vrc_controller"
import { DiscordRouter } from "./Discord/discordbotindex";
//import * as WebControl from "./web/web_controller"
//import { PrismaClient } from '@prisma/client'
import { Elysia,Context,ws } from 'elysia'
import {readFileSync} from 'fs';
import { buffer } from "stream/consumers";
import {discordWsRouter} from './Discord/ws/wsRouter'
import { swagger } from '@elysiajs/swagger'

//const prisma = new PrismaClient()
const PORT = Number(process.env.RIN_LAB_PORT) || 10000; 
const tls:{
	cert?:Buffer ,key?:Buffer
}= {}
if(!process.env.RIN_LAB_PORT)
{
	tls.cert = readFileSync('./keys/public.crt')
	tls.key = readFileSync('./keys/private.key')
}

const app = new Elysia()
.get('/',()=>{return 'hi'})
.group('/vrchat',VrcRouter)
.group('/discord',DiscordRouter)
.listen({ 
	port:process.env.RIN_LAB_PORT||443,   
	hostname:process.env.HOSTNAME || '0.0.0.0',
	tls,
}
)

const ws_server = new Elysia()
.use(ws())
.ws('/ws/discord',discordWsRouter)
.ws('/ws/check',{
	open(ws) {
		ws.send('a')
		ws.close();
	},
})
.listen(
	{
		port:process.env.WS_PORT||9999,
		hostname:process.env.HOSTNAME || '0.0.0.0',
		//tls
	}
)


;
//console.log(process.env)


console.log(`🦊 Elysia is running at ${app.server.hostname}:${app.server.port} / localhost:${app.server.port}`)
console.log(`WEBSOCKET IS ON : ${ws_server.server.port}`)
//export default app
//const wsServer = new WebSocket.Server({ server, path: "/cana_rin_lab_ws" });
//wsServer.on("connection", (ws: WebSocket) => {});

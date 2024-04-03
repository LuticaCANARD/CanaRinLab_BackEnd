import { createServer } from "http";
import { WebSocket } from "ws";
import { VrcRouter } from "./vrchat/vrc_controller"
import { DiscordRouter } from "./Discord/discordbotindex";
import {webRoute} from './web/web_controller'
//import * as WebControl from "./web/web_controller"
//import { PrismaClient } from '@prisma/client'
import { Elysia,Context,t } from 'elysia'
import {readFileSync} from 'fs';
import { buffer } from "stream/consumers";
import {discordWsRouter} from './Discord/ws/wsRouter'
import { swagger } from '@elysiajs/swagger'
import http from 'http';
import path from 'node:path';
import fs from 'fs';
import oauth2, { github,google } from '@bogeychan/elysia-oauth2'
import { html } from '@elysiajs/html'
import cors from '@elysiajs/cors'
import { cron } from '@elysiajs/cron'
import{heartbeat} from './dbchecker'

type CORSOriginFn = (context: Context) => boolean | void


//const prisma = new PrismaClient()
const PORT = Number(process.env.RIN_LAB_PORT) || 10000; 
const tls:{
	cert?:Buffer ,key?:Buffer
}= {}
if(!process.env.RIN_LAB_PORT)
{
	// 실서버에만 적용한다. localhost에 tls먹이기는 귀찮기때문.
	// 하려면 발급해서 와도 되긴 하는데 
	tls.cert = readFileSync(process.env["SSL_PUBLIC"])
	tls.key = readFileSync(process.env["SSL_PRIVATE"])
}
else
{
	tls.cert = readFileSync('./keys/dev_pub_.pem')
	tls.key = readFileSync('./keys/dev_pri.pem')
}
const opt = {
	base:'/web',
	viteConfigFile: `${import.meta.dir}/src/vite.config.ts`, // absolute path to your vite config file
	entryHtmlFile: `${import.meta.dir}/src/web/client/index.html`, // absolute path to your entry html file
	entryClientFile: `${import.meta.dir}/src/web/client/index.tsx`, // absolute path to your entry script file
	isReact: true, // inject React's specific HRM code @see https://vitejs.dev/guide/api-hmr.html
	placeHolderDevScripts: '<!--vite-dev-scripts-->', // placeholder to replace vite scripts
}
const app = new Elysia()

//.use(elysiaVite(opt))
.use(cors({
	origin: /\*/
}))


.get('/',(c:Context<any,any>)=>{
	return 'hi'}
)
.use(cron({
	name:'DB CHECK',
	pattern:'0 0 * * * *',
	run:async()=>{
		await heartbeat();
	}

}))
.group('/vrchat',VrcRouter)
.group('/discord',DiscordRouter)
.group('/api',webRoute)
.listen({ 
	port:process.env.RIN_LAB_PORT||443,   
	hostname:process.env.HOSTNAME || '0.0.0.0',
	tls,
}
)

const ws_server = new Elysia()
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
		tls
	}
);

console.log(`🦊 Elysia is running at ${app.server.hostname}:${app.server.port} ${!process.env.RIN_LAB_PORT?'' :'/ localhost:'+app.server.port}`)
console.log(`WEBSOCKET IS ON : ${ws_server.server.port}`)
//export default app
//const wsServer = new WebSocket.Server({ server, path: "/cana_rin_lab_ws" });
//wsServer.on("connection", (ws: WebSocket) => {});

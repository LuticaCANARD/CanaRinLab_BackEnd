import { createServer } from "http";
import { WebSocket } from "ws";
import { VrcRouter } from "./vrchat/vrc_controller"
//import * as WebControl from "./web/web_controller"
//import { PrismaClient } from '@prisma/client'
import { Elysia,Context } from 'elysia'

//const prisma = new PrismaClient()
const PORT = Number(process.env.RIN_LAB_PORT) || 10000; 

const app = new Elysia()
.get('/bb',()=>{return 'hi'})
.group('/vrchat',VrcRouter)
.listen({
	port:PORT,
	hostname:process.env.HOSTNAME || '0.0.0.0'
});
	console.log(process.env)

console.log(`🦊 Elysia is running at ${app.server.hostname}:${app.server.port} / localhost:${app.server.port}`)
export default app
//const wsServer = new WebSocket.Server({ server, path: "/cana_rin_lab_ws" });
//wsServer.on("connection", (ws: WebSocket) => {});

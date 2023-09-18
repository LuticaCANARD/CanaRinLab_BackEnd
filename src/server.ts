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

import {Client, GatewayIntentBits} from "discord.js";
import {registerCommands} from "./discordDeployer";




//const prisma = new PrismaClient()
const PORT = Number(process.env.RIN_LAB_PORT) || 10000; 
const tls:{
	cert?:Buffer ,key?:Buffer
}= {}
if(!process.env.RIN_LAB_PORT)
{
	// 실서버에만 적용한다. localhost에 tls먹이기는 귀찮기때문.
	// 하려면 발급해서 와도 되긴 하는데 
	tls.cert = readFileSync('./keys/public.crt')
	tls.key = readFileSync('./keys/private.key')
}
else
{
	tls.cert = readFileSync('./keys/dev_pub_.pem')
	tls.key = readFileSync('./keys/dev_pri.pem')
}

const app = new Elysia()
.use(swagger())
.get('/',()=>{
	console.log('l')
	return 'hi'})
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
		tls
	}
);



//console.log(process.env)

const client = new Client({intents: [GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers]});

// Slash Command 추가
//registerCommands(process.env.DISCORD_BOT_TOKEN, process.env.CLIENT_ID, process.env.TO_REGISTER_GUILD);

client.on('interactionCreate', async interaction => {
    // Original: https://discordjs.guide/interactions/replying-to-slash-commands.html#receiving-interactions
    if (!interaction.isCommand()) return;

    if (interaction.commandName === '안녕하세요') {
        await interaction.reply('인사 잘한다~');
    }
});

client.login(process.env.DISCORD_BOT_TOKEN).then(function () {
    console.log("LOGIN SUCCESS.");
});

console.log(`🦊 Elysia is running at ${app.server.hostname}:${app.server.port} ${!process.env.RIN_LAB_PORT?'' :'/ localhost:'+app.server.port}`)
console.log(`WEBSOCKET IS ON : ${ws_server.server.port}`)
//export default app
//const wsServer = new WebSocket.Server({ server, path: "/cana_rin_lab_ws" });
//wsServer.on("connection", (ws: WebSocket) => {});

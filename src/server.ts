import { createServer } from "http";
import { WebSocket } from "ws";
import {VrcRouter} from "./vrchat/vrc_controller"
import * as WebControl from "./web/web_controller"
import { PrismaClient } from '@prisma/client'
import { Elysia,Context } from 'elysia'

const prisma = new PrismaClient()

const app = new Elysia();
const PORT = process.env.PORT || 80;


app.group('/vrchat',VrcRouter)
app.listen(PORT);

//const wsServer = new WebSocket.Server({ server, path: "/cana_rin_lab_ws" });
//wsServer.on("connection", (ws: WebSocket) => {});

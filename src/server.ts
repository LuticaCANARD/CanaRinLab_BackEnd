import express from "express";
import { createServer } from "http";
import { WebSocket } from "ws";
import * as VrcControl from "./vrchat/vrc_controller"
import * as WebControl from "./web/web_controller"
import { createServer as createViteServer } from 'vite'


const app = express();
const server = createServer(app);
const wsServer = new WebSocket.Server({ server, path: "/cana_rin_lab_ws" });
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {

    res.send("RES!!!");
});
app.post('/vrchat/:order/:argu*',async(req, res) => {
    let result = {}
    let request = req.body;
    
    
    res.json(result)
});
wsServer.on("connection", (ws: WebSocket) => {

});

server.listen(PORT, () => {
    console.log(`Server is open... on: ${PORT}`);
});

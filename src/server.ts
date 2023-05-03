import express from "express";
import { createServer } from "http";
import { WebSocket } from "ws";
import * as VrcControl from "./vrchat/vrc_controller"
import * as WebControl from "./web/web_controller"


const app = express();
const server = createServer(app);
const wsServer = new WebSocket.Server({ server, path: "/cana_rin_lab_ws" });
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {

    res.send("RES!!!");
});
app.get('/vrchat/:order',async(req, res) => {
    let request = req.query;
    let result = await VrcControl.VrcControl.routeVrcRequest(request,req.params.order)
    console.log(result)
    res.send(result)
});
wsServer.on("connection", (ws: WebSocket) => {

});

server.listen(PORT, () => {
    console.log(`Server is open... on: ${PORT}`);
});

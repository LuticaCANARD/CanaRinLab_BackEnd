import express from "express";
import { createServer } from "http";
import { WebSocket } from "ws";

const app = express();
const server = createServer(app);
const wsServer = new WebSocket.Server({ server, path: "/cana_rin_lab_ws" });
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("RES!!!");
});
wsServer.on("connection", (ws: WebSocket) => {

});

server.listen(PORT, () => {
    console.log(`Server is open... on: ${PORT}`);
});

import express from "express";
import { createServer } from "http";
import { WebSocket } from "ws";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("RES!!!");
});
app.listen(PORT,()=>{
    console.log(`SERVER IS ON ${PORT}`);
});
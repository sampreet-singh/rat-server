import http from "http";
import { startDiscordBot } from "./discord/bot.js";
import { startSocketServer } from "./socket/server.js";
import config from "@/config/config.json" with { type: "json" };

const httpServer = http.createServer();

startDiscordBot();
startSocketServer(httpServer);

httpServer.listen(config.socket.port, () => {
  console.log(`Hello world from Socket.IO on port ${config.socket.port}!`);
});

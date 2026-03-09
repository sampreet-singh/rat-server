import http from "http";
import { startSocketServer } from "./socket/server.js";
import config from "../config/config.json" with { type: "json" };
import { startDiscordBot } from "./discord/bot.js";

const httpServer = http.createServer();

startDiscordBot();
startSocketServer(httpServer);

httpServer.listen(config["Socket-io"].Port, () => {
  console.log(
    `Hello world from Socket.IO on port ${config["Socket-io"].Port}!`,
  );
});

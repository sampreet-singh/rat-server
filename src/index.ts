import http from "http";
import { startDiscordBot } from "./discord/bot.js";
import { startSocketServer } from "./socket/server.js";
import config from "@/config/config.json" with { type: "json" };

async function startServer() {
  const httpServer = http.createServer();

  startSocketServer(httpServer);

  httpServer.listen(config.server.port, () => {
    console.log(`Socket.IO server running on port ${config.server.port}`);
  });

  return httpServer;
}

async function start() {
  try {
    await startDiscordBot();
    await startServer();
  } catch (error) {
    console.error("Failed with error when starting:", error);
    process.exit(1);
  }
}

start();

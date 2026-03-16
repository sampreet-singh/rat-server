import { resolveEnvironmentVariable as resolve } from "@src/lib/utils.js";
import config from "@config/config.json" with { type: "json" };
import { client } from "@src/discord/client.js";
import { io } from "@src/socket/server.js";
import { logger } from "./lib/logger.js";
import http from "http";

async function start() {
  try {
    // start the discord bot
    await client.login(resolve(config.discord.botToken));

    // start the socket server
    const httpServer = http.createServer();
    io.attach(httpServer);

    httpServer.listen(config.server.port, () => {
      logger.info(`Socket server running on port ${config.server.port}`);
    });
  } catch (error) {
    logger.error(`An error occured while startup: ${error}`);
    process.exit(1);
  }
}

start();

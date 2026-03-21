import { resolveEnvironmentVariable as resolve } from "@src/lib/utils.js";
import config from "@config/config.json" with { type: "json" };
import { setLanguage, t } from "./i18n/index.js";
import { client } from "@src/discord/client.js";
import { io } from "@src/socket/server.js";
import { logger } from "./lib/logger.js";
import http from "http";

async function start() {
  try {
    setLanguage(config.global.lang ?? "en");

    // start the discord bot
    await client.login(resolve(config.discord.botToken));

    // start the socket server
    const httpServer = http.createServer();
    io.attach(httpServer);

    httpServer.listen(config.server.port, () => {
      logger.info(t("socket.started", { port: config.server.port }));
    });
  } catch (error) {
    logger.error(t("app.startup_error", { error: String(error) }));
    process.exit(1);
  }
}

start();

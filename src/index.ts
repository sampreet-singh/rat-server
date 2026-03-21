import { resolve_environment_variable as resolve } from "@src/lib/utils.js";
import config from "@config/config.json" with { type: "json" };
import { set_language, t } from "./i18n/index.js";
import { client } from "@src/discord/client.js";
import { io } from "@src/socket/server.js";
import { logger } from "./lib/logger.js";
import http from "http";

async function start() {
  try {
    set_language(config.global.lang ?? "en");

    await client.login(resolve(config.discord.bot_token));

    const http_server = http.createServer();
    io.attach(http_server);

    http_server.listen(config.server.port, () => {
      logger.info(t("server.started", { port: config.server.port }));
    });
  } catch (error) {
    logger.error(t("errors.startup_error", { error: String(error) }));
    process.exit(1);
  }
}

start();

import http from "http";
import { io } from "@src/socket/server.js";
import { client } from "@src/discord/client.js";
import config from "@config/config.json" with { type: "json" };
import { resolveEnvironmentVariable as resolve } from "@src/lib/utils.js";

async function start() {
  try {
    await client.login(resolve(config.discord.botToken));

    const httpServer = http.createServer();

    io.attach(httpServer);

    httpServer.listen(config.server.port, () => {
      console.log(`Socket.IO server running on port ${config.server.port}`);
    });
  } catch (error) {
    console.error("An error occured during startup:", error);
    process.exit(1);
  }
}

start();

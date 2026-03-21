import { disconnect, identity } from "@src/socket/clients.js";
import { logger } from "@src/lib/logger.js";
import { t } from "@src/i18n/index.js";
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  logger.info(
    t("socket.connections.connected.ip", { ip: socket.handshake.address }),
  );

  socket.on("identify", ({ clientId }) => identity(clientId, socket));

  socket.on("disconnect", () => disconnect(socket));
});

export { io };

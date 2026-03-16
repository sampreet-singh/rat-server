import { disconnect, identity } from "@src/socket/clients.js";
import { logger } from "@src/lib/logger.js";
import { Server } from "socket.io";

const io = new Server({
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  logger.info(`Client connected: IP ${socket.handshake.address}`);

  socket.on("identify", ({ clientId }) => identity(clientId, socket));

  socket.on("disconnect", () => disconnect(socket));
});

export { io };

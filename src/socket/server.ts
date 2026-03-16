import { logger } from "@src/lib/logger.js";
import { Server } from "socket.io";

const io = new Server({
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  const { id } = socket;

  logger.info(`Socket client connected with ID '${id}'`);

  socket.on("disconnect", () => {
    logger.info(`Socket client disconnected with ID '${id}'`);
  });
});

export { io };

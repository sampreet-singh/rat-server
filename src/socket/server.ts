import { disconnect, identity } from "@src/socket/clients.js";
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("identify", ({ client_id }) => identity(client_id, socket));

  socket.on("disconnect", () => disconnect(socket));
});

export { io };

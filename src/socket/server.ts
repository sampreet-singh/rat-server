import { Server } from "socket.io";
import { bus } from "@src/events/bus.js";

const io = new Server({
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  const { id } = socket;

  console.log("client connected:", id);
  bus.emit("clientConnected", { id });

  socket.on("disconnect", () => {
    console.log("client disconnected:", id);
    bus.emit("clientDisconnected", { id });
  });
});

export { io };

import { Server } from "socket.io";
import { bus } from "@/src/events/bus.js";
import { Server as HttpServer } from "http";

export function startSocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
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

  return io;
}

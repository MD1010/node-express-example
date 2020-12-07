import { Server, Socket } from "socket.io";
import { http } from "../app";

export let socketServer: Server;

function listenToEvents() {
  socketServer.on("connection", (socket: Socket) => {
    socket.emit("check");
  });
}
export function initSocketManager() {
  socketServer = new Server(http, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  listenToEvents();
}

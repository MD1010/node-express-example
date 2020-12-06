// import { log } from "console";
import { Socket } from "socket.io";
import { http } from "../app";
import { Server } from "socket.io";

export namespace SocketManager {
  export let socket: Server;

  function listenToEvents() {
    socket.on("connection", (socket: Socket) => {
      socket.emit("check");
    });
  }
  export function initSocketManager() {
    socket = new Server(http, {
      cors: {
        origin: "http://localhost:3000",
      },
    });

    listenToEvents();
  }
}

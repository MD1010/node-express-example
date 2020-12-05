// import { log } from "console";
import { Socket } from "socket.io";
import { http } from "../app";

export namespace SocketManager {
  let socket: Socket;

  function listenToEvents() {
    socket.on("connection", (socket: Socket) => {
      socket.emit("check");
    });
  }
  export function initSocketManager() {
    socket = require("socket.io")(http, {
      cors: {
        origin: "http://localhost:3000",
      },
    });

    listenToEvents();
  }
}

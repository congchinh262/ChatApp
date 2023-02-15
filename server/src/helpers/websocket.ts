import { Server, Socket } from "socket.io";
import { IClient } from "../types/types";
import { Client } from "socket.io/dist/client";
import * as socketIo from "socket.io";

class WebSockets {
  public _users: IClient[] = [];
  public _io: socketIo.Server = new socketIo.Server();
  constructor(io:socketIo.Server) {
    io = this._io;
  }
  connection(client: Socket) {
    // fire all users when room disconnected
    client.on("disconnect", () => {
      this._users = this._users.filter((c) => c.socketId !== client.id);
    });
    /* This is a listener for the client to send the userId to the server. */
    client.on("identity", (userId) => {
      this._users.push({
        socketId: client.id,
        userId,
      });
    });
    client.on("private_msg", (content: string, to: number) => {
      client.to(to.toString()).emit("private_msg", {
        content,
        from: client.id,
      });
    });
    /* This is function to call when client want to join the chat room. */
    client.on("subcribe", (room: string, otherUserIds: number[]) => {
      const socketConn = Object.keys(this._io.sockets.sockets)
      client.join(room);
    });
    /* This is function to call when client want to leave the chat room. */
    client.on("unsubcribe", (room: string) => {
      client.leave(room);
    });
  }
}

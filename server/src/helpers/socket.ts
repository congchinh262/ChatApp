import { Server, Socket } from "socket.io";
import { log } from "./logger";
import { EVENTS, IMessage, REDIS_KEYS } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { redisClient } from "./redis";
import { createRoom, listRooms } from "../controllers/chatRoom";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

const _rooms: Record<string, { name: string }> = {};

const addRoomToRecord = async (userId: number) => {
  const rooms = await listRooms({ userId });
  rooms.forEach((room) => {
    _rooms[String(room._id)] = {
      name: room.name,
    };
  });
};

export const socket = ({ io }: { io: Server }) => {
  const errorHandler = (err: Error) => {
    io.emit(EVENTS.SERVER.ON_ERROR, err);
  };
  io.on(EVENTS.connection, (socket: Socket) => {
    log.info(`User connected ${socket.id} `);
    try {
      console.log(socket.handshake.auth);
      const userInfo = jwt.verify(socket.handshake.auth.token, SECRET_KEY);
      console.log({ userInfo });
    } catch (e) {
      io.on(EVENTS.CONNECTION_ERROR, (err) => {
        socket.disconnect();
      });
    }
    socket.on(EVENTS.CLIENT.CREATE_ROOM, async ({ roomName }) => {
      // create roomId
      try {
        const room = await createRoom({ name: roomName });
        const roomId = room._id.toString();
        console.log({ room });
        // store room as an object
        _rooms[roomId] = {
          name: roomName,
        };
        // join room
        socket.join(roomId);
        // tell everyone it has new room created
        socket.broadcast.emit(EVENTS.SERVER.LIST_ROOM, _rooms);
        // tell room owner room created
        socket.emit(EVENTS.SERVER.LIST_ROOM, _rooms);
        // emit event tell host they has joined room
        socket.emit(EVENTS.SERVER.JOINNED_ROOM, roomId);
      } catch (e) {
        errorHandler(e as Error);
      }
    });
    // handel send message event
    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, message, username }) => {
        const time = moment().format("YYYY-MM-DD HH:mm:ss").toString();
        /*TODO: store message history into mongodb */
        const messageContent: IMessage = {
          username,
          message,
          timeDelivery: time,
        };
        // redisClient
        //   .hset(REDIS_KEYS.MESSAGE, roomId, JSON.stringify(messageContent))
        //   .catch((e) => {
        //     throw new Error(e.message);
        //   });
        /* Sending message to all clients in the room except the sender. */
        socket.to(roomId).emit(`${EVENTS.SERVER.ROOM_MESSAGE}`, {
          message,
          username,
          time,
          fromRoom: roomId,
        });
      }
    );
    socket.on(EVENTS.CLIENT.JOIN_ROOM, ({ roomId }) => {
      socket.join(roomId);
      log.info(`${socket.id} has joinned ${roomId}`);
      socket.emit(EVENTS.SERVER.JOINNED_ROOM, roomId);
      socket.on(EVENTS.CLIENT.LIST_ROOM_MESSAGES, async (roomId) => {
        /*TODO: get meessages from redis*/
        // const messages = await redisClient.hget(REDIS_KEYS.MESSAGE,roomId);
        // if(!messages){
        //   return [];
        // }
      });
    });
    socket.on(EVENTS.CLIENT.LEAVE_ROOM, ({ roomId }) => {
      delete _rooms[roomId];
      socket.leave(roomId);
    });
    socket.on(EVENTS.CLIENT.DISCONNECT, ({ socketId }) => {
      socket.disconnect();
    });
  });
};

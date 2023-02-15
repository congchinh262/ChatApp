import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface ChatMessage {
  author: string;
  message: string;
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  userId: string;
  userType: string;
}

export interface IClient {
  userId: number;
  socketId: string;
}

export const EVENTS = {
  connection: "connection",
  CONNECTION_ERROR: "CONNECTION_ERROR",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
    LEAVE_ROOM: "LEAVE_ROOM",
    DISCONNECT: "DISCONNECT",
    LIST_ROOM_MESSAGES:"LIST_ROOM_MESSAGES",
  },
  SERVER: {
    JOINNED_ROOM: "JOIN_ROOM",
    LIST_ROOM: "LIST_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
    NOTI_WELCOME: "NOTI_WELCOME",
    ON_ERROR: "ON_ERROR"
  },
};

export interface IMessage{
  username:string;
  message:string;
  timeDelivery:string;
}

export const REDIS_KEYS={
  MESSAGE:"room-message",
}
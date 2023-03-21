import { Socket } from "socket.io";
import { SECRET_KEY } from "../config";
import jwt from "jsonwebtoken";

export const authForSocket = (
  socket: Socket,
  next: (err?: Error, params?: any) => any
) => {
  try {
    const token = socket.handshake.auth.token;
    const userData = jwt.verify(token, SECRET_KEY) as { userId: number };
    socket.data.user = userData;
    if (!socket.data.user) {
      throw new Error("Unauthorized!");
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
  next();
};

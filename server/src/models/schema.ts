import mongoose, { model, Schema } from "mongoose";

//#region type
// interface IUser {
//   name: string;
//   password: string;
//   type: UserType;
// }

// export enum UserType {
//   CUSTOMMER = "CUSTOMMER",
//   ADMIN = "ADMIN",
// }

export interface IRoom {
  name: string;
  messages: IRoomMessage[];
  usersId: number[];
}
export interface IRoomMessage {
  roomId: mongoose.Types.ObjectId;
  userId: number;
  content: string;
  sendDate: Date;
}
//#endregion

const room = new Schema<IRoom>({
  name: { type: String, required: true },
  usersId: { type: [], required: true },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "RoomMessage",
    },
  ],
});

const roomMessage = new Schema<IRoomMessage>({
  roomId: { type: Schema.Types.ObjectId, ref: "Room" },
  userId: { type: Number, required: true },
  content: { type: String, required: true },
  sendDate: { type: Date, default: new Date() },
});

export const Room = model<IRoom>("Room", room);
export const RoomMessage = model<IRoomMessage>("RoomMessage", roomMessage);

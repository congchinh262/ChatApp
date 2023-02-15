import { prisma } from "../.prismaClient";
import { prismaClient } from "../models/prisma";
import { Room } from "../models/schema";

export const createRoom = async ({ name }: { name: string }) => {
  try {
    const newRoom = await Room.create({
      name,
    });
    return newRoom;
  } catch (err) {
    throw new Error("Create room failed!");
  }
};

export const listRooms = async ({ userId }: { userId: number }) => {
  return await Room.find({
    usersId: userId,
  });
};
export const getRecentConversation = () => {};
export const getConversationByRoomId = ({ roomId }: { roomId: string }) => {
  return Room.findById(roomId).then(async (roomInfo) => {
    if (!roomInfo) {
      return [];
    }
    const messages = await roomInfo.populate("messages");
    return messages;
  });
};
export const markConversationByRoomId = () => {};
export const deleteRoomById = ({ roomId }: { roomId: string }) => {
  return Room.findByIdAndDelete(roomId).then(async (result) => {
    if (!result) {
      throw new Error("Delete room failed!");
    }
    return { success: true, deletedRoom: result };
  });
};

export const joinUsersToRoom = async ({
  roomId,
  usernames,
}: {
  roomId: string;
  usernames: string[];
}) => {
  const userIds: number[] = [];
  usernames.forEach(async (n) => {
    const user = await prismaClient.user.findFirst({
      where: {
        name: n,
      },
      select:{
        id:true
      }
    });
    if(!user) return;
    userIds.push(user.id);
  });
  if(userIds.length===0){
    throw new Error("No user was found!");
  }
  return await Room.findByIdAndUpdate(roomId,{
    userIds: userIds
  })
};

export const deleteUsersFromRoom = async ({
  roomId,
  userIds,
}: {
  roomId: string;
  userIds: number[];
}) => {
  const room = await Room.findById(roomId).exec();
  if (!room) {
    throw new Error("Room not found!");
  }
  const oldUserIds = room.usersId;
  const newUserIds = oldUserIds.filter((uid) => {
    return userIds.indexOf(uid) == -1;
  });
  return await Room.findOneAndUpdate(
    {
      _id: roomId,
    },
    {
      userIds: newUserIds,
    }
  );
};

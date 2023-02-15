import { IRoomMessage, Room, RoomMessage } from "../models/schema";

export const createMessage = ({message}:{message:IRoomMessage})=>{
    return RoomMessage.create({
        roomId: message.roomId,
        userId: message.userId,
        content: message.content,
        sendDate: message.sendDate
    }).then((result)=>{
        if(!result){
            throw new Error("Create Message Failed!");
        }
        return result;
    }).catch(e=>{
        throw new Error(e.message);
    })
}

export const deleteMessage = ({messageId}:{messageId:string})=>{
    RoomMessage.deleteOne({
        _id:messageId
    }).then(result=>{
        return {success: true, deletedCount:result.deletedCount}
    }).catch(e=>{
        throw new Error(e.message);
    })
}
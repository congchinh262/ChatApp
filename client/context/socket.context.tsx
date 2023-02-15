import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/events";

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: { message: string; time: string; username: string, fromRoom:string }[];
  setMessages: Function;
  roomId?: string;
  setRoomId: Function;
  rooms: object;
}

const SocketContext = createContext<Context>({
  socket: io(SOCKET_URL),
  setUsername: () => false,
  setMessages: () => false,
  setRoomId: ()=>false,
  rooms: {},
  roomId: "",
  messages: [],
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState([]);
  const socketRef = useRef<Socket>(null);
  if (socketRef.current === null) {
    socketRef.current = io(SOCKET_URL);
  }
  console.log("2");
  const { current: socket } = socketRef;
  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat app";
    };
  }, []);

  socket.on(EVENTS.SERVER.LIST_ROOM, (value) => {
    setRooms(value);
  });

  useEffect((): any => {
    socket.on(EVENTS.SERVER.JOINNED_ROOM, (value) => {
      setRoomId(value);
      setMessages([]);
      console.log({ value, roomId });
    });
    return () => socket.off();
  }, []);

  useEffect((): any => {
    socket.on(
      `${EVENTS.SERVER.ROOM_MESSAGE}`,
      ({ message, username, time,fromRoom }) => {
        if (!document.hasFocus()) {
          document.title = "New message...";
        }
        /* If selected room is roomId, then render message, if not count message to another roomId*/
        setMessages((messages) => [...messages, { message, username, time,fromRoom }]);
      }
    );
    return () => socket.off();
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        setRooms,
        roomId,
        setRoomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;

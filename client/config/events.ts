const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    JOINNED_ROOM: "JOIN_ROOM",
    LIST_ROOM: "LIST_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
    ON_ERROR: "ON_ERROR"
  },
};

export default EVENTS;

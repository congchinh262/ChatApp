import { Server, createServer } from "http";
import * as socketIo from "socket.io";
import { CHAT_EVENT } from "./constants";
import { ChatMessage } from "./types/types";
import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { userRouter } from "./routes/user";
import { socket } from "./helpers/socket";
import { defaultConf } from "./config";

dotenv.config();
const port = process.env.PORT || 8080;
const app = express();
const server = createServer(app);
const io = new socketIo.Server(server, {
  cors: {
    origin: defaultConf.corsOrigin,
    credentials: true,
  },
});

// app.options("*", cors());
app.use(express.json());
app.use(cors());

//route
app.use("/user", userRouter);
app.get("/", (req: Request, res: Response) => res.send("Halo!!"));
export const startApp = () => {
  server.listen(port, () => {
    console.log(`App is running at port: ${port}`);
    // io.on(CHAT_EVENT.CONNECT, (socket: socketIo.Socket) => {
    //   console.log("connected");
    //   io.emit("[server]:Welcome to channel!");
    //   socket.on(CHAT_EVENT.MESSAGE, (msg: ChatMessage) => {
    //     console.log(msg);
    //     io.emit("message", msg);
    //   });
    //   socket.on(CHAT_EVENT.DISCONNECT, () => {
    //     console.log("disconnect");
    //     io.emit("[server]: Bye bye!");
    //   });
    // });
    socket({ io });
  });
};

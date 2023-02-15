import * as express from "express";
import {
  getAllUsers,
  getUser,
  deleteUser,
  register,
  login,
} from "../controllers/user";

export const userRouter = express.Router();
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.post("/register", register);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login",login);
userRouter.get("/test", (req: express.Request, res: express.Response) => {
  console.log("JDKHASKDJA");
  return res.send("OK!");
});

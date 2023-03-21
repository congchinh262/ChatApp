import * as express from "express";
import {
  getAllUsers,
  getUser,
  deleteUser,
  register,
  login,
  verify,
} from "../controllers/user";

import { body, check } from "express-validator";
import { validateFields } from "../controllers/api";

export const userRouter = express.Router();
// TODO: Add validation
userRouter.get("/", getAllUsers);
// userRouter.get("/:id", getUser);
userRouter.post("/register",validateFields(['username','password','email']), register);
userRouter.delete("/:id", validateFields(['id']),deleteUser);
userRouter.post("/login", validateFields(['username','password']),login);
userRouter.get("/verifyRegister/", verify);
userRouter.get("/test", (req: express.Request, res: express.Response) => {
  console.log("JDKHASKDJA");
  return res.send("OK!");
});
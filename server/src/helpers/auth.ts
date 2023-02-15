import bcrypt from "bcrypt";
import { UserType } from "../.prismaClient";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export namespace AuthHelpers {
  export const validatePw = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
  };

  export const createJwt = (id: number, type: UserType) => {
    const payload = {
      userId: id,
      type: type,
    };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "30 days",
    });
    return token;
  };
}

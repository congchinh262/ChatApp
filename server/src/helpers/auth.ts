import bcrypt from "bcrypt";
import { Prisma, UserType } from "../.prismaClient";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { object, refine, size, string,assert } from "superstruct";


export namespace AuthHelpers {
  const isEmail = (email:string) => {
    const matched =  String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    return matched ? true : false;
  };
  const AuthInfo= object({
    username: size(string(),2,30),
    password: size(string(),6,30),
    email: refine(string(), 'email', (v) => isEmail(v)),
  })
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
  type AuthInfo = Omit<Prisma.UserCreateArgs['data'], 'id'>

  export const validateInfo = async (params:{username:string,password:string,email:string})=>{
    try{
      assert(params,AuthInfo);
      return true;
    }
    catch(e){
      return false;
    }
  }
}

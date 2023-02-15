import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { prismaClient, prismaClientRo } from "../models/prisma";
import { CustomRequest } from "../types/types";

// export const createJwt = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { userId } = req.params;
//   console.log("==========id=============");
//   console.log(userId);
//   console.log("==========/id/=============");
//   try {
//     const user = await prismaClientRo.user.findFirst({
//       where: {
//         id: +userId,
//       },
//       select: {
//         name: true,
//         id: true,
//         type: true,
//       },
//     });
//     if (!user) {
//       return res.status(404).send({ errorMessage: "User not found!" });
//     }
//     const payload = {
//       userId: user.id,
//       type: user.type,
//     };
//     const token = jwt.sign(payload, SECRET_KEY, {
//       expiresIn: "30 days",
//     });
//     console.log(token);
//     (req as CustomRequest).token = token;
//     next();
//   } catch (e) {
//     return res.status(500).send({
//       success: false,
//       message: `${e}`,
//     });
//   }
// };

export const validateJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers["authorization"]) {
    return res.status(400).send({
      success: false,
      message: "No access token provided!",
    });
  }
  const accessToken = req.headers["authorization"].split(" ")[1];
  try {
    const decoded = <any>jwt.verify(accessToken, SECRET_KEY);
    (req as CustomRequest).userId = decoded.userId;
    (req as CustomRequest).userType = decoded.type;
    const {userId,type,exp}=decoded;
    if(Date.now()>=exp*1000){
      return res.status(401).send({
        success:false,
        message: "Token expired!"
      })
    }
    next();
  } catch (e) {
    return res.status(401).send({
      success: false,
      message: e,
    });
  }
};


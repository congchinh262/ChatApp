import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
// import { User, UserType } from "../models/schema";
import { User, UserType, prismaClient, prismaClientRo } from "../models/prisma";
import { AuthHelpers } from "../helpers/auth";
import { CustomRequest } from "../types/types";

export const getAllUsers = (req: Request, res: Response) => {
  return prismaClientRo.user
    .findMany({
      select: {
        id: true,
        name: true,
        type: true,
      },
    })
    .then((users) => {
      if (!users) {
        return res.status(404).send({
          success: false,
          errorMessage: "No user was registed!",
        });
      }
      return res.send({
        success: true,
        data: users,
      });
    });
};
export const register = (req: Request, res: Response) => {
  const {
    userName,
    password,
    type,
  }: { userName: string; password: string; type: UserType } = req.body;
  if (!userName || !password) {
    return res.status(400).send({
      success: false,
      errorMessage: "Bad request!",
    });
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return prismaClient.user.create({
        data: {
          name: userName,
          password: hash,
          type: type,
        },
      });
    })
    .then((user) => {
      return res.send({
        success: true,
        data: {
          id: user.id,
          name: user.name,
        },
      });
    })
    .catch((e) => {
      return res.send({
        success: false,
        errorMessage: e,
      });
    });
};
export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  return prismaClientRo.user
    .findFirst({
      where: {
        id: +id,
      },
      select: {
        id: true,
        name: true,
        type: true,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          success: false,
          errorMessage: "User not found!",
        });
      }
      return res.send({
        success: true,
        user: user,
      });
    });
};
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Bad request!");
  }
  return prismaClient.user
    .delete({
      where: {
        id: +id,
      },
      select: {
        id: true,
        name: true,
        type: true,
      },
    })
    .then((user) => {
      return res.status(200).send({
        success: true,
        user: user,
      });
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({
      success: false,
      message: "Bad request!",
    });
  }
  return prismaClientRo.user
    .findFirst({
      where: {
        name: username,
      },
    })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User name not found!",
        });
      }
      if (!(await AuthHelpers.validatePw(password, user.password))) {
        return res.status(401).send({
          success: false,
          message: "Invalid user name or password!",
        });
      }
      const authToken = AuthHelpers.createJwt(user.id, user.type);
      return res.status(200).send({
        success: true,
        authorizeToken: authToken,
      });
    })
    .catch((e) => {
      return res.status(401).send({
        success: false,
        message: String(e),
      });
    });
};

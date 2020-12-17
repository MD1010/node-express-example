import { Request, Response } from "express";
import { UserDAL } from "../dal/user.dal";
import { UserEntity } from "../entities";
import {IUser} from "gymstagram-common"
import { User } from "../models";
import { errorHandler } from "../utils/errorHandler";
import { socketServer } from "../utils/socketManager";
import { GenericCrudController } from "./utils/generic-crud.controller";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Exceptions } from "../utils";

export class UserController extends GenericCrudController<User> {
  constructor() {
    super(UserEntity)
  }

  login = errorHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await UserEntity.find({ username }) as IUser;
    if (!user || !user.isAdmin || !bcrypt.compareSync(password, user.password))
      throw Exceptions.UNAUTHORIZED;

    var token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: 86400, // 24 hours
    });

    res.json({
      username: user.username,
      accessToken: token,
    });
  });

  getAllUsers = this.getAllEntites;
  getUserTrainingsByMuscleGroup = errorHandler(async (req: Request, res: Response) => {
    return res.json(await UserDAL.TrainingsByTags(req.params.username, req.params.day));
  });
}


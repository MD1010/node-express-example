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
    const user = await UserEntity.find({ username }) as IUser[];
    if (!user || !user[0].isAdmin || !bcrypt.compareSync(password, user[0].password))
      throw Exceptions.UNAUTHORIZED;

    var token = jwt.sign({ id: user[0]._id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: 86400, // 24 hours
    });

    res.json({
      username: user[0].username,
      accessToken: token,
    });
  });

  getAllUsers = this.getAllEntites;
  getUserTrainingsByMuscleGroup = errorHandler(async (req: Request, res: Response) => {
    return res.json(await UserDAL.TrainingsByMuslceGroup(req.params.username, req.params.day));
  });

  AddExcericeToDayTraining = errorHandler(async (req: Request, res: Response) => {
    return res.json(await UserDAL.AddExcericeToDayTraining(req.params.username, req.body.exerciseID, req.body.personalPreferences));
  });
}


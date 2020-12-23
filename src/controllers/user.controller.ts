import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserDAL } from "../dal/user.dal";
import { UserEntity } from "../entities";
import { User } from "../models";
import { Exceptions } from "../utils";
import { errorHandler } from "../utils/errorHandler";
import { GenericCrudController } from "./utils/generic-crud.controller";

export class UserController extends GenericCrudController<User> {
  constructor() {
    super(UserEntity);
  }

  login = errorHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await UserEntity.findOne({ username });
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
  getUserTrainingsByMuscleGroup = errorHandler(
    async (req: Request, res: Response) => {
      return res.json(
        await UserDAL.TrainingsByMuslceGroup(
          req.params.username,
          req.params.day
        )
      );
    }
  );

  AddExcericeToDayTraining = errorHandler(
    async (req: Request, res: Response) => {
      return res.json(
        await UserDAL.AddExcericeToDayTraining(
          req.params.username,
          req.body.exerciseID,
          req.body.personalPreferences
        )
      );
    }
  );
  likeTraining = errorHandler(async (req: Request, res: Response) => {
    let likesToAdd = req.body.dataToSend.likes;
    let userLikedObject = req.body.dataToSend.user;
    let objectId = req.body.dataToSend.objectId;
    let objectType = req.body.dataToSend.type;

    let response = await UserDAL.updateLikes(
      objectId,
      userLikedObject,
      likesToAdd,
      objectType
    );
    res.json(response);
  });
}

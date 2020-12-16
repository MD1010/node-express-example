import { Request, Response } from "express";
import { UserDAL } from "../dal/user.dal";
import { UserEntity } from "../entities";
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
  getUserTrainingsByTags = errorHandler(async (req: Request, res: Response) => {
    return res.json(await UserDAL.TrainingsByTags(req.params.username, req.params.day));
  });


//   createExercise = errorHandler(async (req: Request, res: Response) => {
//     let response = await this.dbEntity.create(req.body);
//     socketServer.sockets.emit("new_exercise");
//     res.json(response);
//   });
//   getExercise = this.getEntityById;
//   updateExercise = this.updateEntity;
//   deleteExercise = this.deleteEntity;
//   getExercisesByTag = errorHandler(async (req: Request, res: Response) => {
//     return res.json(await ExerciseDAL.getExercisesByTag(req.params.name));
//   });
//   groupByTags =  errorHandler(async (req: Request, res: Response) => {
//     return res.json(await ExerciseDAL.ExericesGroupByTags());
//   });
}


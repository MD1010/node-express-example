import { Request, Response } from "express";
import { UserDAL } from "../dal/user.dal";
import { UserEntity } from "../entities";
import { User } from "../models";
import { errorHandler } from "../utils/errorHandler";
import { socketServer } from "../utils/socketManager";
import { GenericCrudController } from "./utils/generic-crud.controller";

export class UserController extends GenericCrudController<User> {
  constructor() {
    super(UserEntity)
  }

  getAllUsers = this.getAllEntites;
  getUserTrainingsByTags = errorHandler(async (req: Request, res: Response) => {
    return res.json(await UserDAL.TrainingsByTags(req.params.name));
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

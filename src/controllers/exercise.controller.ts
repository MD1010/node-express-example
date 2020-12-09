import { Request, Response } from "express";
import { Exercise } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import {ExerciseDAL} from "../dal/exercise.dal"
import { ExerciseEntity } from "../entities";
import { throws } from "assert";
import { errorHandler } from "../utils/errorHandler";
import { socketServer } from "../utils/socketManager";

export class ExerciseController extends GenericCrudController<Exercise> {
  constructor() {
    super(ExerciseEntity)
  }

  getAllExercises = this.getAllEntites;
  createExercise = errorHandler(async (req: Request, res: Response) => {
    let response = await this.dbEntity.create(req.body);
    socketServer.sockets.emit("new_exercise");
    res.json(response);
  });
  getExercise = this.getEntityById;
  updateExercise = this.updateEntity;
  deleteExercise = this.deleteEntity;
  groupByTags =  errorHandler(async (req: Request, res: Response) => {
    return res.json(await ExerciseDAL.ExericesGroupByTags());
  });
}

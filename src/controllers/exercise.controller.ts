import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Exercise } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import {ExerciseDAL} from "../dal/exercise.dal"
import { ExerciseEntity } from "../entities";

export class ExerciseController extends GenericCrudController<Exercise> {
  constructor() {
    super(ExerciseEntity)
  }

  getAllExercises = this.getAllEntites;
  createExercise = this.createEntity;
  getExercise = this.getEntityById;
  updateExercise = this.updateEntity;
  deleteExercise = this.deleteEntity;
  groupByTags =  errorHandler(async (req: Request, res: Response) => {
    return res.json(await ExerciseDAL.ExericesGroupByTags());
  });
}

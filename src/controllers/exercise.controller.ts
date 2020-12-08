import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Exercise } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import { throws } from "assert";
import { DbEnity } from "../dal/genric-entity.dal";

export class ExerciseController extends GenericCrudController<Exercise> {
  getAllExercises = this.getAllEntites;
  createExercise = this.createEntity;
  getExercise = this.getEntityById;
  updateExercise = this.updateEntity;
  deleteExercise = this.deleteEntity;

  groupByTags =  errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.ExericesGroupByTags());
  });
}

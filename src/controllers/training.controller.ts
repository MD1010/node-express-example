import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Training } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import {TrainingDAL} from "../dal/trainings.dal"
import { TrainingEntity } from "../entities";

export class TrainingController extends GenericCrudController<Training> {
  
  constructor() {
    super(TrainingEntity)
  }

  getAllTrainings = this.getAllEntites;
  createTraining = this.createEntity;
  getTraining = this.getEntityById;
  updateTraining = this.updateEntity;
  deleteTraining = this.deleteEntity;
  groupByTags =  errorHandler(async (req: Request, res: Response) => {
    return res.json(await TrainingDAL.TrainingsGroupByTags());
  });
}

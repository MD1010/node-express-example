import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Training } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";

export class TrainingController extends GenericCrudController<Training> {
  getAllTrainings = this.getAllEntites;
  createTraining = this.createEntity;
  getTraining = this.getEntityById;
  updateTraining = this.updateEntity;
  deleteTraining = this.deleteEntity;

  groupByTags =  errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.dbEntity.groupByTags());
  });
}

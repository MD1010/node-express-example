import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Training } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import {TrainingDAL} from "../dal/trainings.dal"
import { TrainingEntity } from "../entities";
import { socketServer } from "../utils/socketManager";

export class TrainingController extends GenericCrudController<Training> {
  
  constructor() {
    super(TrainingEntity)
  }

  getAllTrainings = this.getAllEntites;
  getTraining = this.getEntityById;
  updateTraining = this.updateEntity;
  deleteTraining = this.deleteEntity;
  groupByTags =  errorHandler(async (req: Request, res: Response) => {
    return res.json(await TrainingDAL.TrainingsGroupByTags());
  });
  getTrainingsByName = errorHandler(async (req: Request, res: Response) => {
    return res.json(await TrainingDAL.getTrainingsByName(req.params.name));
  });
  createTraining = errorHandler(async (req: Request, res: Response) => {
    let response = await this.dbEntity.create(req.body);
    socketServer.sockets.emit("new_training");
    res.json(response);
  });
}

import { Request, Response } from "express";
import { ITraining } from "gymstagram-common";
import { orderBy } from "lodash";
import { TrainingDAL } from "../dal/trainings.dal";
import { TrainingEntity } from "../entities";
import { Training } from "../models";
import { errorHandler } from "../utils/errorHandler";
import { socketServer } from "../utils/socketManager";
import { GenericCrudController } from "./utils/generic-crud.controller";
//import { generateTraining } from "./utils/generate-training";
import getVideoDurationInSeconds from "get-video-duration";

export class TrainingController extends GenericCrudController<Training> {
  constructor() {
    super(TrainingEntity);
  }

  getAllTrainings = this.getEntities;
  getTraining = this.getEntityById;
  updateTraining = this.updateEntity;
  deleteTraining = this.deleteEntity;
  groupByMuscleGroup = errorHandler(async (req: Request, res: Response) => {
    return res.json(await TrainingDAL.groupByMuscleGroup());
  });
  getTrainingsByName = errorHandler(async (req: Request, res: Response) => {
    return res.json(await TrainingDAL.getTrainingsByName(req.params.name));
  });
  createTraining = errorHandler(async (req: Request, res: Response) => {
    const training: Training = { ...req.body };
    training.duration = await getVideoDurationInSeconds(training.video);
    let newEntity = await this.dbEntity.create(training);
    socketServer.sockets.emit("new_training");
    return res.json({ created: newEntity._id });
  });
  getSortedTrainings = errorHandler(async (req: Request, res: Response) => {
    let sortBy = req.params.sortBy;
    let trainings = await this.dbEntity.find({});
    let sortedTrainings = orderBy(trainings, [sortBy], ["desc"]);
    res.json(sortedTrainings);
  });
}

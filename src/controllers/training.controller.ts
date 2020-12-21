import { Request, response, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Training } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import { TrainingDAL } from "../dal/trainings.dal";
import { TrainingEntity } from "../entities";
import { socketServer } from "../utils/socketManager";
import { ITraining } from "gymstagram-common";
import { orderBy, result } from "lodash";
import youtube from "scrape-youtube";
import { Results, Video } from "scrape-youtube/lib/interface";
//import { generateTraining } from "./utils/generate-training";

export class TrainingController extends GenericCrudController<Training> {
  constructor() {
    super(TrainingEntity);
  }

  getAllTrainings = this.getAllEntites;
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
    let response = await this.dbEntity.create(req.body);
    socketServer.sockets.emit("new_training");
    res.json(response);
  });
  getSortedTrainings = errorHandler(async (req: Request, res: Response) => {
    let sortBy = req.params.sortBy;
    let trainings = await this.dbEntity.find({});
    let sortedTrainings = orderBy(trainings, [sortBy], ["desc"]);
    res.json(sortedTrainings);
  });
  likeTraining = errorHandler(async (req: Request, res: Response) => {
    let likesToAdd = req.body.dataToSend.likes;
    let userLikedObject = req.body.dataToSend.user;
    let objectId = req.body.dataToSend.objectName;
    let objectType = req.body.dataToSend.type;

    let response = await TrainingDAL.updateLikes(
      objectId,
      userLikedObject,
      likesToAdd,
      objectType
    );
    res.json(response);
  });
}

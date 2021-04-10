import { Request, Response } from "express";
//import { generateTraining } from "./utils/generate-training";
import youtube from "scrape-youtube";
import { orderBy } from "lodash";
import { TrainingDAL } from "../dal/trainings.dal";
import { TrainingEntity } from "../entities";
import { Training } from "../models";
import { errorHandler } from "../utils/errorHandler";
import { socketServer } from "../utils/socketManager";
import { GenericCrudController } from "./utils/generic-crud.controller";
import { ITraining } from "gymstagram-common";

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
    let youtubeVideo = await youtube.search(training.video);
    training.duration = youtubeVideo.videos[0]?.duration || 600;
    let newEntity = await this.dbEntity.create(training);
    socketServer.sockets.emit("newItem", "training");
    return res.json({ created: newEntity._id });
  });
  getSortedTrainings = errorHandler(async (req: Request, res: Response) => {
    console.log(req.params);
    console.log(req.query);
    let sortedTrainings: ITraining[] = [];
    let sortBy = req.params.sortBy;
    let trainingName = req.query.name;
    if (trainingName != undefined) {
      sortedTrainings = orderBy(
        await this.dbEntity.find({
          $query: { name: { $regex: `.*${trainingName}.*` } },
        }),
        [sortBy],
        ["desc"]
      );
    } else {
      sortedTrainings = orderBy(await this.dbEntity.find({}), [sortBy], ["desc"]);
    }

    res.json(sortedTrainings);
  });
}

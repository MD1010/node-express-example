import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Training } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import { TrainingDAL } from "../dal/trainings.dal";
import { TrainingEntity } from "../entities";
import { socketServer } from "../utils/socketManager";
import { ITraining } from "gymstagram-common";
import { orderBy, result } from "lodash";
import youtube from "scrape-youtube";
import { log } from "console";
import { Results, Video } from "scrape-youtube/lib/interface";
import { generateTraining } from "./utils/generate-training";

export class TrainingController extends GenericCrudController<Training> {
  constructor() {
    super(TrainingEntity);
  }

  getAllTrainings = this.getAllEntites;
  getTraining = this.getEntityById;
  updateTraining = this.updateEntity;
  deleteTraining = this.deleteEntity;
  groupByTags = errorHandler(async (req: Request, res: Response) => {
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
  getSortedTrainings = errorHandler(async (req: Request, res: Response) => {
    let sortBy = req.params.sortBy;
    let trainings = await this.dbEntity.findAll();
    let sortedTrainings: ITraining[] = orderBy(trainings, [sortBy], ["desc"]);
    res.json(sortedTrainings);
  });
  scrapTrainings = errorHandler(async (req: Request, res: Response) => {
    let serachExpression = req.body.searchText;
    let tags = req.body.tags;
    let results: Results = await youtube.search(serachExpression);
    let training;
    results.videos.map(async (video: Video) => {
      training = generateTraining(video.title, video.link, tags);
      let response = await this.dbEntity.create(training);
    });

    // res.json(Object.keys(results.video).length);
    // res.json(Object.keys(results.videos[0]).length);
    res.json(results.videos);
  });
}

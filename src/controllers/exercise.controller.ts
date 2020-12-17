import Axios from "axios";
import { Request, Response } from "express";
import { JSDOM } from "jsdom";
import { threadId } from "worker_threads";
import { ExerciseDAL } from "../dal/exercise.dal";
import { ExerciseEntity } from "../entities";
import { Exercise } from "../models";
import { Exceptions } from "../utils";
import { errorHandler } from "../utils/errorHandler";
import { socketServer } from "../utils/socketManager";
import { scrapData } from "./utils/scrape";
import { GenericCrudController } from "./utils/generic-crud.controller";

export class ExerciseController extends GenericCrudController<Exercise> {
  constructor() {
    super(ExerciseEntity);
  }
  getAllExercises = this.getAllEntites;
  getExercise = this.getEntityById;
  updateExercise = this.updateEntity;
  deleteExercise = this.deleteEntity;

  createExercise = errorHandler(async (req: Request, res: Response) => {
    const newEntity = await this.dbEntity.create(req.body);
    socketServer.sockets.emit("new_exercise");
    return res.json({ created: newEntity._id });
  });

  getExercisesByTag = errorHandler(async (req: Request, res: Response) => {
    return res.json(await ExerciseDAL.getExercisesByTag(req.params.name));
  });

  groupByTags = errorHandler(async (req: Request, res: Response) => {
    return res.json(await ExerciseDAL.ExericesGroupByTags());
  });
}

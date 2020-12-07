import { Request, Response } from "express";
import { Exercise } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import { throws } from "assert";
import { errorHandler } from "../utils/errorHandler";
import { SocketManager } from "../utils/socketManager";

export class ExerciseController extends GenericCrudController<Exercise> {
  getAllExercises = this.getAllEntites;
  createExercise = errorHandler(async (req: Request, res: Response) => {
    let response = await this.dbEntity.create(req.body);
    SocketManager.socket.sockets.emit("new_exercise");
    res.json(response);
  });
  getExercise = this.getEntityById;
  updateExercise = this.updateEntity;
  deleteExercise = this.deleteEntity;
}

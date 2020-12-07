import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Training } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import { SocketManager } from "../utils/socketManager";

export class TrainingController extends GenericCrudController<Training> {
  getAllTrainings = this.getAllEntites;
  createTraining = errorHandler(async (req: Request, res: Response) => {
    let response = await this.dbEntity.create(req.body);
    SocketManager.socket.sockets.emit("new_training");
    res.json(response);
  });
  getTraining = this.getEntityById;
  updateTraining = this.updateEntity;
  deleteTraining = this.deleteEntity;
}

import { ControllerFactory } from "./utils/controller-factory";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler";
import { Exceptions } from "../utils/exceptions";
import { Training } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";

export class TrainingController extends ControllerFactory<Training> {
  getAllTrainings = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.getAllEntities());
  });

  createTraining = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.createEntity(req.body));
  });

  getTraining = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.getEntity({ id: req.params.id }));
  });

  updateTraining = errorHandler(async (req: Request, res: Response) => {
    return res.json(
      await this.crudController.updateEntity(req.params.id, req.body)
    );
  });

  deleteTraining = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.deleteEntity(req.params.id));
  });
}

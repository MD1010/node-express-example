import { ControllerFactory } from "./utils/controller-factory";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler";
import { Exceptions } from "../utils/exceptions";
import { Training } from "../models";
import { GenericCrudActions } from "./utils/generic-crud-actions";

export class TrainingController extends ControllerFactory<Training> {
  getAllTrainings = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.getAllEntities());
  });

  createTraining = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.createEntity(req.body));
  });

  getTraining = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.getEntity({ id: req.params.id }));
  });

  updateTraining = errorHandler(async (req: Request, res: Response) => {
    return res.json(
      await this.crudActions.updateEntity(req.params.id, req.body)
    );
  });

  deleteTraining = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.deleteEntity(req.params.id));
  });
}

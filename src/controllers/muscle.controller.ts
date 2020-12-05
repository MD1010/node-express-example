import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Muscle } from "../models";
import { ControllerFactory } from "./utils/controller-factory";

export class MuscleController extends ControllerFactory<Muscle> {
  getAllMuscles = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.getAllEntities());
  });

  createMuscle = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.createEntity(req.body));
  });

  getMuscle = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.getEntity({ id: req.params.id }));
  });

  updateMuscle = errorHandler(async (req: Request, res: Response) => {
    return res.json(
      await this.crudController.updateEntity(req.params.id, req.body)
    );
  });

  deleteMuscle = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.deleteEntity(req.params.id));
  });
}

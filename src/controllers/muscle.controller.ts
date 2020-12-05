import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Muscle } from "../models";
import { ControllerFactory } from "./utils/controller-factory";

export class MuscleController extends ControllerFactory<Muscle> {
  getAllMuscles = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.getAllEntities());
  });

  createMuscle = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.createEntity(req.body));
  });

  getMuscle = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.getEntity({ id: req.params.id }));
  });

  updateMuscle = errorHandler(async (req: Request, res: Response) => {
    return res.json(
      await this.crudActions.updateEntity(req.params.id, req.body)
    );
  });

  deleteMuscle = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.deleteEntity(req.params.id));
  });
}

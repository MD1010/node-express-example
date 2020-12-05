import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Exercise } from "../models";
import { CrudActionsFactory } from "./utils/controller-factory";

export class ExerciseController extends CrudActionsFactory<Exercise> {
  getAllExercises = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.getAllEntities());
  });

  createExercise = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.createEntity(req.body));
  });

  getExercise = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.getEntity({ id: req.params.id }));
  });

  updateExercise = errorHandler(async (req: Request, res: Response) => {
    return res.json(
      await this.crudActions.updateEntity(req.params.id, req.body)
    );
  });

  deleteExercise = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudActions.deleteEntity(req.params.id));
  });
}

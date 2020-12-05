import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Exercise } from "../models";
import { ControllerFactory } from "./utils/controller-factory";

export class ExerciseController extends ControllerFactory<Exercise> {
  getAllExercises = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.getAllEntities());
  });

  createExercise = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.createEntity(req.body));
  });

  getExercise = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.getEntity({ id: req.params.id }));
  });

  updateExercise = errorHandler(async (req: Request, res: Response) => {
    return res.json(
      await this.crudController.updateEntity(req.params.id, req.body)
    );
  });

  deleteExercise = errorHandler(async (req: Request, res: Response) => {
    return res.json(await this.crudController.deleteEntity(req.params.id));
  });
}

import { Router } from "express";
import { TrainingEntity } from "../entities";
import { TrainingController } from "./../controllers";

export const trainingRouter = Router();
const trainingController = new TrainingController(TrainingEntity);

trainingRouter.get("/", trainingController.getAllTrainings);
trainingRouter.post("/", trainingController.createTraining);
trainingRouter.put("/:id", trainingController.updateTraining);
trainingRouter.get("/:id", trainingController.getTraining);
trainingRouter.delete("/:id", trainingController.deleteTraining);

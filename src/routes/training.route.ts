import { Router } from "express";
import { TrainingController } from "./../controllers";

export const trainingRouter = Router();
const trainingController = new TrainingController();

trainingRouter.get("/name/:name", trainingController.getTrainingsByName);
trainingRouter.get("/", trainingController.getAllTrainings);
trainingRouter.get(
  "/sortedTraining/:sortBy",
  trainingController.getSortedTrainings
);
trainingRouter.get("/muscleGroup", trainingController.groupByMuscleGroup);
trainingRouter.post("/", trainingController.createTraining);
trainingRouter.put("/:id", trainingController.updateTraining);
trainingRouter.get("/:id", trainingController.getTraining);
trainingRouter.delete("/:id", trainingController.deleteTraining);

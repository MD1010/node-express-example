import { Router } from "express";
import { TrainingController } from "./../controllers";

export const trainingRouter = Router();
const trainingController = new TrainingController();

trainingRouter.get("/", trainingController.getAllTrainings);
trainingRouter.get("/groupByTags", trainingController.groupByTags);
trainingRouter.post("/", trainingController.createTraining);
trainingRouter.put("/:id", trainingController.updateTraining);
trainingRouter.get("/:id", trainingController.getTraining);
trainingRouter.delete("/:id", trainingController.deleteTraining);

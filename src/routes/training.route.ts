import { Router } from "express";
import { TrainingController } from "../controllers";

export const trainingRouter = Router();

const trainingController = new TrainingController();

trainingRouter.get("/", trainingController.getAllEntities);
trainingRouter.post("/", trainingController.createEntity);
trainingRouter.put("/:id", trainingController.updateEntity);
trainingRouter.get("/:id", trainingController.getEntity);
trainingRouter.delete("/:id", trainingController.deleteEntity);

import { Router } from "express";
import { ExerciseController } from "../controllers";

export const exerciseRouter = Router();

const exerciseController = new ExerciseController();

exerciseRouter.get("/", exerciseController.getAllEntities);
exerciseRouter.post("/", exerciseController.createEntity);
exerciseRouter.put("/:id", exerciseController.updateEntity);
exerciseRouter.get("/:id", exerciseController.getEntity);
exerciseRouter.delete("/:id", exerciseController.deleteEntity);

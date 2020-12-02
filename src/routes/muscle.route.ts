import { Router } from "express";
import { MuscleController } from "../controllers";

export const muscleRouter = Router();
const muscleController = new MuscleController();

muscleRouter.get("/", muscleController.getAllEntities);
muscleRouter.post("/", muscleController.createEntity);
muscleRouter.put("/:id", muscleController.updateEntity);
muscleRouter.get("/:id", muscleController.getEntity);
muscleRouter.delete("/:id", muscleController.deleteEntity);

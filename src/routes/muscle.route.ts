import { Router } from "express";
import { MuscleEntity } from "../entities";
import { MuscleController } from "./../controllers";

export const muscleRouter = Router();
const muscleController = new MuscleController(MuscleEntity);

muscleRouter.get("/", muscleController.getAllMuscles);
muscleRouter.post("/", muscleController.createMuscle);
muscleRouter.put("/:id", muscleController.updateMuscle);
muscleRouter.get("/:id", muscleController.getMuscle);
muscleRouter.delete("/:id", muscleController.deleteMuscle);

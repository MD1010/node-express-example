import { Router } from "express";
import { MuscleController } from "./../controllers";

export const muscleRouter = Router();
const muscleController = new MuscleController();

muscleRouter.get("/", muscleController.getAllMuscles);
muscleRouter.post("/", muscleController.createMuscle);
muscleRouter.put("/:id", muscleController.updateMuscle);
muscleRouter.get("/:id", muscleController.getMuscle);
muscleRouter.delete("/:id", muscleController.deleteMuscle);

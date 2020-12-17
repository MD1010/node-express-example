import { Router } from "express";
import { MuscleGroupController } from "./../controllers";

export const muscleGroupRouter = Router();
const muscleGroupController = new MuscleGroupController();

muscleGroupRouter.get("/", muscleGroupController.getAllMuscleGroups);
muscleGroupRouter.post("/", muscleGroupController.createMuscleGroup);
muscleGroupRouter.put("/:id", muscleGroupController.updateMuscleGroup);
muscleGroupRouter.get("/:id", muscleGroupController.getMuscleGroup);
muscleGroupRouter.delete("/:id", muscleGroupController.deleteMuscleGroup);

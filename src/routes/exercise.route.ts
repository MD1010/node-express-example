import { ExerciseController } from "./../controllers";
import { Router } from "express";

export const exerciseRouter = Router();
const exerciseController = new ExerciseController();

exerciseRouter.get("/", exerciseController.getAllExercises);
exerciseRouter.get("/muscleGroup/:name", exerciseController.getExercisesByMuscleGroup);
exerciseRouter.get("/muscleGroups", exerciseController.groupByMuscleGroup);
exerciseRouter.post("/", exerciseController.createExercise);
exerciseRouter.put("/:id", exerciseController.updateExercise);
exerciseRouter.get("/:id", exerciseController.getExercise);
exerciseRouter.delete("/:id", exerciseController.deleteExercise);

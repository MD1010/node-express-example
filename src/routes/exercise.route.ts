import { Router } from "express";
import { ExerciseEntity } from "../entities";
import { ExerciseController } from "./../controllers";

export const exerciseRouter = Router();
const exerciseController = new ExerciseController(ExerciseEntity);

exerciseRouter.get("/", exerciseController.getAllExercises);
exerciseRouter.post("/", exerciseController.createExercise);
exerciseRouter.put("/:id", exerciseController.updateExercise);
exerciseRouter.get("/:id", exerciseController.getExercise);
exerciseRouter.delete("/:id", exerciseController.deleteExercise);

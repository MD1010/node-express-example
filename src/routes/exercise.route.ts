import { ExerciseController } from "./../controllers";
import { Request, Response, Router } from "express";
import { AdminController } from "../controllers";
import { errorHandler } from "../utils/errorHandler";
import { Exercise } from "../models";
import { ExerciseEntity } from "../entities";

export const exerciseRouter = Router();
const exerciseController = new ExerciseController(ExerciseEntity);

exerciseRouter.get("/", exerciseController.getAllExercises);
exerciseRouter.post("/", exerciseController.createExercise);
exerciseRouter.put("/:id", exerciseController.updateExercise);
exerciseRouter.get("/:id", exerciseController.getExercise);
exerciseRouter.delete("/:id", exerciseController.deleteExercise);

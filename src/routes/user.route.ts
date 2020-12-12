import { ExerciseController } from "./../controllers";
import { Router } from "express";

export const userRouter = Router();
const userController = new ExerciseController();

userRouter.get("/:username/trainings", userController.getAllUsersTrainings);



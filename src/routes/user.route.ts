import { UserController } from "./../controllers";
import { Router } from "express";

export const userRouter = Router();
const userController = new UserController();

userRouter.get("/:username/trainings/:day", userController.getUserTrainingsByMuscleGroup);
userRouter.post("/:username/trainings", userController.AddExcericeToDayTraining);
userRouter.post("/login", userController.login);
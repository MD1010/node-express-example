import { UserController } from "./../controllers";
import { Router } from "express";
import { authenticateJWT } from "../utils/auth";

export const userRouter = Router();
const userController = new UserController();

userRouter.post("/login", userController.login);

userRouter.get(
  "/:username/trainings/:day",
  authenticateJWT,
  userController.getUserTrainingsByMuscleGroup
);
userRouter.post(
  "/:username/trainings",
  authenticateJWT,
  userController.AddExcericeToDayTraining
);

userRouter.post("/like", authenticateJWT, userController.likeTraining);

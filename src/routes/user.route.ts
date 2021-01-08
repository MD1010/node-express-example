import { Router } from "express";
import { authenticateJWT } from "../utils/auth";
import { UserController } from "./../controllers";

export const userRouter = Router();
const userController = new UserController();

userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.signup);

userRouter.get("/:username/trainings/:day", authenticateJWT, userController.getUserTrainingsByMuscleGroup);
userRouter.post("/:username/trainings", authenticateJWT, userController.AddExcericeToDayTraining);

userRouter.post("/like", authenticateJWT, userController.likeTraining);

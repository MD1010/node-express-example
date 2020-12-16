import { UserController } from "./../controllers";
import { Router } from "express";

export const userRouter = Router();
const userController = new UserController();

userRouter.get("/:username/trainings/:day", userController.getUserTrainingsByTags);



userRouter.post("/login", userController.login);
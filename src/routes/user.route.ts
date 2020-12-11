import { Router } from "express";
import { UserController } from "../controllers";

export const userRouter = Router();
const userController = new UserController();

userRouter.post("/login", userController.login);

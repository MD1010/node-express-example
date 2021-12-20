import { Router } from "express";
import { UserController } from "../controllers";

export const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.getUsers);
userRouter.post("/add", userController.addUser);
userRouter.delete("/delete/:id", userController.deleteUser);

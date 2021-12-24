import { Router } from "express";
import { UserController } from "../controllers";

export const userRouter = Router();
const userController = new UserController();

// !! all endpoint that start with /users go here
// !! first parameter is the suffix of the enpoints, second parameter is the funtion that will be invoked
userRouter.get("/", userController.getUsers);
userRouter.post("/add", userController.addUser);
userRouter.delete("/delete/:id", userController.deleteUser);

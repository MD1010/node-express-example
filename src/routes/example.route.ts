import { Router } from "express";
import { MyController } from "../controllers";

export const myRouter = Router();
const myController = new MyController();

myRouter.post("/in", myController.someFunc);

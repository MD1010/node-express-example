import { Request, Response, Router } from "express";
import { AdminController } from "../controllers";
import { errorHandler } from "../helpers/errorHandler";

export const adminRouter = Router();
adminRouter.post("/login", AdminController.login);

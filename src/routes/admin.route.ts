import { Router } from "express";
import { AdminController } from "../controllers";

export const adminRouter = Router();
const adminController = new AdminController();

adminRouter.post("/login", adminController.login);

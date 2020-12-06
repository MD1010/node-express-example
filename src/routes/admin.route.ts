import { Router } from "express";
import { AdminController } from "../controllers";
import { AdminEntity } from "../entities";

export const adminRouter = Router();
const adminController = new AdminController(AdminEntity);

adminRouter.post("/login", adminController.login);

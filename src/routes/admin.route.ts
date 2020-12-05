import { Request, Response, Router } from "express";
import { AdminController } from "../controllers";
import { AdminEntity } from "../entities";
import { errorHandler } from "../utils/errorHandler";

export const adminRouter = Router();
const adminController = new AdminController(AdminEntity);

adminRouter.post("/login", adminController.login);

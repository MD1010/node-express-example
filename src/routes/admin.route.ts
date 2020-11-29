import { Response, Router, Request } from "express";
import { AdminController } from "../controllers";

export const adminRouter = Router();
adminRouter.post("/login", (req: Request, res: Response) => {
  const userName = req.body.username;
  const password = req.body.password;
  AdminController.login(userName, password, res);
});

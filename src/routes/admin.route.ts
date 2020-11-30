import { Response, Router, Request } from "express";
import { AdminController } from "../controllers";
import { IServerException } from "../helpers/exceptions";

export const adminRouter = Router();
adminRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const userName = req.body.username;
    const password = req.body.password;
    const result = await AdminController.login(userName, password);
    res.json(result);
  } catch (error) {
    res.status(error.code).send(error);
  }
});

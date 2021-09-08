import { Request, Response } from "express";
import { add } from "../services";
import { errorHandler } from "../utils/error-handler";

export class MyController {
  constructor() {}

  someFunc = errorHandler(async (req: Request, res: Response) => {
    return res.json({ res: add(+req.body.a, +req.body.b) });
  });
}

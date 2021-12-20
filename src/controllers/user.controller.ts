import { Request, Response } from "express";
import { User } from "../models/user.model";
import { errorHandler } from "../utils/error-handler";

export class UserController {
  constructor() {}

  getUsers = errorHandler(async (req: Request, res: Response) => {
    const users = await User.findAll({ raw: true });
    return res.json(users);
  });

  addUser = errorHandler(async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    const addedUser = await User.upsert({ firstName, lastName });
    return res.json({ addedId: addedUser[0].get().id });
  });

  deleteUser = errorHandler(async (req: Request, res: Response) => {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    return res.json({ deleted: !!deleted });
  });
}

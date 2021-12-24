import { Request, Response } from "express";
import { sequelize } from "../db.init";
import { User } from "../models/user.model";

import { errorHandler } from "../utils/error-handler";
// import { uuidv4 as uuid } from "uuid" // todo: install uuid package from npm
// ?? https://sequelize.org/master/manual/raw-queries.html

export class UserController {
  constructor() {}
  // !! selects all users and returns from DB
  getUsers = errorHandler(async (req: Request, res: Response) => {
    const users = await User.findAll();
    return res.json(users);
  });
  // !! insert a new user to DB
  addUser = errorHandler(async (req: Request, res: Response) => {
    const addedUser = await User.upsert({
      firstName: req.body.firstName,
      lastName: req.body.lastName /*id:  use uuid library */,
    });
    return res.json({ addedId: addedUser[0].get().id });
  });
  // !! deletes a user from DB
  deleteUser = errorHandler(async (req: Request, res: Response) => {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    return res.json({ isDeleted: !!deleted });
  });
}

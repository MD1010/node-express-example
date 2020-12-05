import { DbEnity } from "./../dal/genric-entity.dal";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models";
import { errorHandler } from "../utils/errorHandler";
import { Exceptions } from "../utils/exceptions";
import { GenericDalActions } from "../dal/crud-actions.dal";

export class AdminController {
  private _dalActions: GenericDalActions<Admin>;
  constructor(private dbEntity: DbEnity<Admin>) {
    this._dalActions = new GenericDalActions(dbEntity);
  }
  login = errorHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const admin = await this._dalActions.getDalEntity({ username });

    if (!admin || !bcrypt.compareSync(password, admin.password))
      throw Exceptions.WRONG_CREDENTIALS;
    //hash passwords and save to db in with 8 rounds -> bcrypt.hashSync("123456", 8)

    var token = jwt.sign({ id: admin._id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: 86400, // 24 hours
    });

    res.json({
      username: admin.username,
      accessToken: token,
    });
  });
}

import { ControllerFactory } from "./utils/controller-factory";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AdminEntity } from "../entities";
import { errorHandler } from "../utils/errorHandler";
import { Exceptions } from "../utils/exceptions";
import { Admin } from "../models";
import { GenericCrudActions } from "./utils/generic-crud-actions";

export class AdminController extends ControllerFactory<Admin> {
  login = errorHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const admin = await this.crudController.getEntity({ username });

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

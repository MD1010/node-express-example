import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models";
import { errorHandler } from "../utils/errorHandler";
import { Exceptions } from "../utils/exceptions";
import { DbEnity } from "./../dal/genric-entity.dal";

export class AdminController {
  constructor(private dbEntity: DbEnity<Admin>) {}
  login = errorHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const admin = await this.dbEntity.findOne({ username });

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

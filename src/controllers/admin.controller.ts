import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AdminDAL } from "../dal";
import { errorHandler } from "../helpers/errorHandler";
import { Exceptions } from "../helpers/exceptions";

export namespace AdminController {
  export const login = errorHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const admin = await AdminDAL.dbLogin(username, password);

    if (!admin) throw Exceptions.WRONG_CREDENTIALS;
    //hash passwords and save to db in with 8 rounds -> bcrypt.hashSync("123456", 8)

    const passwordIsValid = bcrypt.compareSync(password, admin.password);

    if (!passwordIsValid) {
      throw Exceptions.WRONG_CREDENTIALS;
    }

    var token = jwt.sign({ id: admin._id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: 86400, // 24 hours
    });

    res.json({
      username: admin.username,
      accessToken: token,
    });
  });
}

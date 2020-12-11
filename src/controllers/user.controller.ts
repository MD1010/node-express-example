import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserEntity } from "../entities";
import { errorHandler } from "../utils/errorHandler";
import { Exceptions } from "../utils/exceptions";

export class UserController {
  login = errorHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await UserEntity.findOne({ username });

    if (!user || !user.isAdmin || !bcrypt.compareSync(password, user.password))
      throw Exceptions.UNAUTHORIZED;

    var token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: 86400, // 24 hours
    });

    res.json({
      username: user.username,
      accessToken: token,
    });
  });
}

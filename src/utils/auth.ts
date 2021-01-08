import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Exceptions } from "./exceptions";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
      if (err) {
        throw Exceptions.SESSION_TIMEOUT;
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

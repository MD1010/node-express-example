import { Request, Response } from "express";
import { AdminDAL } from "../dal";

export namespace AdminController {
  export async function login(
    userName: string,
    password: string,
    res: Response
  ) {
    AdminDAL.dbLogin(userName, password, res);
    // jwt
    // secret -> .env
    // salt
  }
}

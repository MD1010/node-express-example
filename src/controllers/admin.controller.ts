import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminDAL } from "../dal";
import { Exceptions } from "../helpers/exceptions";

export namespace AdminController {
  export async function login(userName: string, password: string) {
    const admin = await AdminDAL.dbLogin(userName, password);
    if (!admin) {
      throw Exceptions.WRONG_CREDENTIALS;
    }
    //hash passwords and save to db in with 8 rounds -> bcrypt.hashSync("123456", 8)

    const passwordIsValid = bcrypt.compareSync(password, admin.password);
    if (!passwordIsValid) {
      throw Exceptions.WRONG_CREDENTIALS;
    }

    var token = jwt.sign({ id: admin._id }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: 86400, // 24 hours
    });
    return {
      username: admin.username,
      accessToken: token,
    };
  }
}

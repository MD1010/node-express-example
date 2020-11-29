import { Response } from "express";
import { IAdmin } from "../interfaces/admin.interface";
import { Admin } from "../models/admin.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export namespace AdminDAL {
  export const dbLogin = async (
    userName: string,
    password: String,
    res: Response
  ) => {
    const admin: IAdmin | null = await Admin.findOne({
      username: userName,
    });
    //.exec((err, admin) => {
    //   if (err) {
    //     res.status(500).send({ message: err });
    //     return;
    //   }
    //   if (!admin) {

    //     return res.status(404).send({ message: "Admin Not found." });
    //   }
    //   var passwordIsValid = bcrypt.compareSync(password, admin.password);
    //   if (!passwordIsValid) {
    //     return res.status(401).send({
    //       accessToken: null,
    //       message: "Invalid Password!",
    //     });
    //   }
    //   var token = jwt.sign({ id: admin.id }, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: 86400 // 24 hours
    //   });
    //   res.status(200).send({
    //       id: admin._id,
    //       username: admin.username,
    //       accessToken:token
    //   })
    // });
  };
}

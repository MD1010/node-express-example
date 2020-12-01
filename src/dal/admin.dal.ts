import { Admin } from "../models/admin.model";

export namespace AdminDAL {
  export const dbLogin = async (userName: string, password: String) => {
    let admin = await Admin.findOne({
      username: userName,
    });
    return admin;
  };
}

import { AdminEntity } from "../entities";

export namespace AdminDAL {
  export const dbLogin = async (username: string, password: string) => {
    let admin = await AdminEntity.findOne({
      username,
    });
    return admin;
  };
}

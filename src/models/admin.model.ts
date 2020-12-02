import { model, Model, Schema } from "mongoose";
import { IAdmin } from "../interfaces/admin.interface";
import { DbEnity } from "./genric-entity.dal";

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const AdminEntity = new DbEnity<IAdmin>("Admin", AdminSchema);
// export const Admin: Model<IAdmin> = model("Admin", AdminSchema);

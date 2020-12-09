import { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { Admin } from "../models/admin.model";

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const AdminEntity = new DbEnity<Admin>("Admin", AdminSchema);

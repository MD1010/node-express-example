import { model, Model, Schema } from "mongoose";
import { Admin } from "../models/admin.model";
import { DbEnity } from "../dal/genric-entity.dal";
import {} from "gymstagram-common";

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const AdminEntity = new DbEnity<Admin>("Admin", AdminSchema);

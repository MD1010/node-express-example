import { model, Model, Schema } from "mongoose";
import { IAdmin } from "../models/admin.model";
import { DbEnity } from "./genric-entity.dal";

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const AdminEntity = new DbEnity<IAdmin>("Admin", AdminSchema);

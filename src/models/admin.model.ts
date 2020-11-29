import mongoose from "mongoose";
import { model, Schema, Model, Document } from "mongoose";
import { IAdmin } from "../interfaces/admin.interface";

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const Admin: Model<IAdmin> = model("Admin", AdminSchema);

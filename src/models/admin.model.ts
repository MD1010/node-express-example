import { Document, model, Model, Schema } from "mongoose";
import { BaseDocumentId } from "../dal/base-id";
import { IAdmin } from "../interfaces/admin.interface";

type AdminDocument = IAdmin & Document & BaseDocumentId;

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const Admin: Model<AdminDocument> = model("Admin", AdminSchema);

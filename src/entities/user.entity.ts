import { Schema } from "mongoose";
import { DbEnity } from "../dal";
import { User } from "../models";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
  trainings: [{ type: Schema.Types.ObjectId, required: true }],
});

export const UserEntity = new DbEnity<User>("User", UserSchema);

import { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { User } from "../models/user.model";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  trainings: [{
    day: {type: Number},
    exercises: [{ type: Schema.Types.ObjectId, required: true, ref: "Exercise" }]
  }]
});

export const UserEntity = new DbEnity<User>("User", UserSchema);

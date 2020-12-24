import { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { Muscle } from "../models";

const MuscleSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false }
);

export const MuscleEntity = new DbEnity<Muscle>("Muscle", MuscleSchema);

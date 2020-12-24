import { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { MuscleGroup } from "../models";

const MuscleGroupSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    muscles: [{ type: Schema.Types.ObjectId, required: true, ref: "Muscle" }],
    image: { type: String, required: true },
  },
  { collection: "muscleGroups", versionKey: false }
);

export const MuscleGroupEntity = new DbEnity<MuscleGroup>("MuscleGroup", MuscleGroupSchema);

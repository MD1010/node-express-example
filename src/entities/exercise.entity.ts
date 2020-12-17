import mongoose, { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { Exercise } from "../models";

const ExerciseSchema: Schema = new Schema({
  name: { type: String, required: true },
  video: { type: String, required: true },
  muscleGroup: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "MuscleGroup",
  },

  muscles: {
    primary: [{ type: Schema.Types.ObjectId, required: true, ref: "Muscle" }],
    secondary: [{ type: Schema.Types.ObjectId, required: true, ref: "Muscle" }],
  },
  image: { type: String, required: true },
  instructions: [{ type: String, required: true }],
});


export const ExerciseEntity = new DbEnity<Exercise>("Exercise", ExerciseSchema);

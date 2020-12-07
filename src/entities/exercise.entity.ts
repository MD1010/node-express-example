import mongoose, { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { Exercise } from "../models";

const ExerciseSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  muscles: [{ type: mongoose.Types.ObjectId, required: true, ref: "Muscle" }],
  difficulty: { type: Schema.Types.Number, required: true },
  notes: { type: Schema.Types.String },
  sets: { type: Schema.Types.Number, required: true },
  reps: { type: Schema.Types.Number, required: true },
  restTime: { type: Schema.Types.Number, required: true },
});

export const ExerciseEntity = new DbEnity<Exercise>("Exercise", ExerciseSchema);

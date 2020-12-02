import mongoose, { Schema } from "mongoose";
import { Exercise } from "../models";
import { DbEnity } from "../dal/genric-entity.dal";

const ExerciseSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: Schema.Types.ObjectId, required: true },
  url: { type: String, required: true },
  muscles: [{ type: mongoose.Types.ObjectId, required: true, ref: "Muscle" }],
  difficulty: { type: Schema.Types.Number, required: true },
  notes: { type: Schema.Types.String, required: true },
  sets: { type: Schema.Types.Number, required: true },
  reps: { type: Schema.Types.Number, required: true },
  restTime: { type: Schema.Types.Number, required: true },
});

export const ExerciseEntity = new DbEnity<Exercise>("Exercise", ExerciseSchema);

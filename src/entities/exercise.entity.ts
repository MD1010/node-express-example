import mongoose, { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { Exercise } from "../models";

const ExerciseSchema: Schema = new Schema({
  name: { type: String, required: true },
  video: { type: String, required: true },
  difficulty: { type: Schema.Types.Number, required: true },
  sets: { type: Schema.Types.Number, required: true },
  reps: { type: Schema.Types.Number, required: true },
  restTime: { type: Schema.Types.Number, required: true },
  tag: [{ type: Schema.Types.ObjectId, required: true, ref: "Tag" }],
});


export const ExerciseEntity = new DbEnity<Exercise>("Exercise", ExerciseSchema);

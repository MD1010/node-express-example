import { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { Training } from "../models";

const TrainingSchema: Schema = new Schema({
  name: { type: String, required: true },
  musclesGroup: [
    { type: Schema.Types.ObjectId, required: true, ref: "MuscleGroup" },
  ],
  exercises: [{ type: Schema.Types.ObjectId, required: true, ref: "Exercise" }],
  video: { type: String, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
  numOfLikes: { type: Number, required: true },
  likedBy: [{ type: String, required: true }],
  difficultyLevel: { type: String, required: true },
});

export const TrainingEntity = new DbEnity<Training>("Training", TrainingSchema);

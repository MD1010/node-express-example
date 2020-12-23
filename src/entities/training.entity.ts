import { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { Training } from "../models";

const TrainingSchema: Schema = new Schema({
  name: { type: String, required: true },
  musclesGroups: [{ type: Schema.Types.ObjectId, required: true, ref: "MuscleGroup" }],
  exercises: [{ type: Schema.Types.ObjectId, required: true, ref: "Exercise" }],
  video: { type: String, required: true },
  createdAt: { type: Schema.Types.Date, default: new Date() },
  numOfLikes: { type: Number, default: 0 },
  likedBy: [{ type: String, default: [] }],
  difficultyLevel: { type: Number, required: true },
});

export const TrainingEntity = new DbEnity<Training>("Training", TrainingSchema);

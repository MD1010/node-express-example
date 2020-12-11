import { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { Training } from "../models";

const TrainingSchema: Schema = new Schema({
  name: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, required: true, ref: "Tag" }],
  exercises: [{ type: Schema.Types.ObjectId, required: true, ref: "Exercise" }],
  video: [{ type: String, required: true }],
  createdAt: { type: Schema.Types.Date, required: true },
  numOfLikes: { type: Number, required: true },
});

export const TrainingEntity = new DbEnity<Training>("Training", TrainingSchema);

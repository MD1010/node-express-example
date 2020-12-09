import{ Schema } from "mongoose";
import { Training } from "../models";
import { Document } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";

const TrainingSchema: Schema = new Schema({
  name: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, required: true, ref: "Tag" }],
  exercises: [{ type: Schema.Types.ObjectId, required: true, ref: "Exercise" }],
});

export const TrainingEntity = new DbEnity<Training>("Training", TrainingSchema);

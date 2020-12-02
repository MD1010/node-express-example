import mongoose, { Model, Schema } from "mongoose";
import { ITraining } from "../models";
import { Document } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";

const TrainingSchema: Schema = new Schema({
  name: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, required: true, ref: "Tag" }],
  exercises: [{ type: Schema.Types.ObjectId, required: true, ref: "Exercise" }],
});

export const TrainingEntity = new DbEnity<ITraining>(
  "Training",
  TrainingSchema
);

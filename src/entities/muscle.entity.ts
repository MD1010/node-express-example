import mongoose, { Model, Schema } from "mongoose";
import { Muscle } from "../models";
import { Document } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";

const MuscleSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export const MuscleEntity = new DbEnity<Muscle>("Muscle", MuscleSchema);

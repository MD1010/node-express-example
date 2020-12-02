import mongoose, { Model, Schema } from "mongoose";
import { ITag } from "../models";
import { Document } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";

const TagSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export const TagEntity = new DbEnity<ITag>("Tag", TagSchema);

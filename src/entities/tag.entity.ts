import { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { Tag } from "../models";

const TagSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export const TagEntity = new DbEnity<Tag>("Tag", TagSchema);

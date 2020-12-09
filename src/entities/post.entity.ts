import { Schema } from "mongoose";
import { Post } from "../models";
import { DbEnity } from "../dal/genric-entity.dal";
import { Post } from "../models";

const PostSchema: Schema = new Schema({
  publisher: { type: String, required: true },
  trainingID: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  numOfLikes: { type: Number, required: true },
  date: { type: Schema.Types.Date, required: true },
});

export const PostEntity = new DbEnity<Post>("Post", PostSchema);

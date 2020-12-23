import { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { Post } from "../models";

const PostSchema: Schema = new Schema(
  {
    publisher: { type: String, required: true },
    trainingID: { type: Schema.Types.ObjectId, required: true, ref: "Training" },
    content: { type: String, required: true },
    numOfLikes: { type: Number, required: true },
    createdAt: { type: Schema.Types.Date, required: true },
  },
  { versionKey: false }
);

export const PostEntity = new DbEnity<Post>("Post", PostSchema);

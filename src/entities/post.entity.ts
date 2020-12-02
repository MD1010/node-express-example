import mongoose, { Model, Schema } from "mongoose";
import { IPost } from "../models";
import { Document } from "mongoose";
import { DbEnity } from "./genric-entity.dal";

const PostSchema: Schema = new Schema({
  publisher: { type: String, required: true },
  trainingID: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  numOfLikes: { type: Number, required: true },
  date: { type: Schema.Types.Date, required: true },
});

export const PostEntity = new DbEnity<IPost>("Post", PostSchema);

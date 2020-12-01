import mongoose, { Schema } from 'mongoose';
import {IPost} from "../interfaces"

const PostSchema: Schema = new Schema({
  publisher: { type: String, required: true},
  trainingID: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  numOfLikes: { type: Number, required: true },
  date: { type: Schema.Types.Date, required: true }
});

const Posts = mongoose.model<IPost>('Posts', PostSchema);
export default Posts

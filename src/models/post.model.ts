import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  publisher: string;
  trainingID: Schema.Types.ObjectId;
  content: string;
  numOfLikes: number;
  date: Schema.Types.Date;
}

const PostSchema: Schema = new Schema({
  publisher: { type: String, required: true},
  trainingID: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  numOfLikes: { type: Number, required: true },
  date: { type: Schema.Types.Date, required: true }
});

export default mongoose.model<IPost>('Post', PostSchema);

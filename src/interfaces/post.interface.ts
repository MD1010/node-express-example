import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  _id: mongoose.Types.ObjectId,
  publisher: string;
  trainingID: Schema.Types.ObjectId;
  content: string;
  numOfLikes: number;
  date: Schema.Types.Date;
}
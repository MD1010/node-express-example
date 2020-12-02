import mongoose, { Schema, Document } from "mongoose";
import { IExercise } from "./exercise.model";
import { ITag } from "./tag.model";

export interface ITraining extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  tags: ITag[];
  exercises: IExercise[];
}

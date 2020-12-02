import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
}

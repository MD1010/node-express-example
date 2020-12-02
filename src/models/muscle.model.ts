import mongoose, { Schema, Document } from "mongoose";

export interface IMuscle extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
}

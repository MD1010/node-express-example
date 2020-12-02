import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
}

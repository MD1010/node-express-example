import mongoose, { CreateQuery, UpdateQuery } from "mongoose";

export const toObjectId = (_id: string): mongoose.Types.ObjectId => {
  return mongoose.Types.ObjectId.createFromHexString(_id);
};

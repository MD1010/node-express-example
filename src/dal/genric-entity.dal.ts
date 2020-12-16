import mongoose, { Document, Model, Schema } from "mongoose";
import {TrainingEntity} from "../entities"
import {
  IReadEntity,
  IWriteEntity,
} from "../interfaces/generic-crud.interface";
import { toObjectId } from "./../utils/base-id";

export class DbEnity<T extends Document>
  implements IReadEntity<T>, IWriteEntity<T> {
  protected _model: Model<Document>;

  constructor(modelName: string, schema: Schema) {
    this._model = mongoose.model(modelName, schema);
  }

  getModel = () => {
    return this._model;
  };

  create(entity: T) {
    return this._model
      .create(entity)
      .then((data) => data as T)
      .catch((error: Error) => {
        throw error;
      });
  }

  updateOne(id: string, entity: T) {
    return this._model
      .updateOne({ _id: toObjectId(id) }, entity)
      .then((data) => data)
      .catch((error: Error) => {
        throw error;
      });
  }

  deleteOne(id: string) {
    return this._model
      .deleteOne({ _id: toObjectId(id) })
      .then((data) => {
        return data;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  findOne(filter: { [key: string]: any }) {
    return this._model
      .findOne(filter)
      .then((result) => {
        return result as T;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  findAll() {
    console.log(typeof(this._model))
    console.log(this._model.modelName)
    console.log(TrainingEntity instanceof this._model)
    // switch(this._model) {
    //   case User:
    //     return this._model
    //   .find()
    //   .populate({
    //     path: "exercises",
    //     populate: {path: "muscles"}
    //   })
    //   .populate("tags")
    //   .then((result) => {
    //     return result as T[];
    //   })
    //   .catch((error: Error) => {
    //     throw error;
    //   });
    // }

    ////////
    return this._model
      .find()
      .populate({
        path: "exercises",
        populate: {path: "muscles"}
      })
      .populate("tags")
      .then((result) => {
        return result as T[];
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}

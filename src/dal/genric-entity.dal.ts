import mongoose, { Document, Model, Schema } from "mongoose";
import { toObjectId } from "../utils/base-id";
import {
  IReadEntity,
  IWriteEntity,
} from "../interfaces/generic-crud.interface";

export class DbEnity<T extends Document>
  implements IReadEntity<T>, IWriteEntity<T> {
  private _model: Model<Document>;

  constructor(modelName: string, schema: Schema) {
    this._model = mongoose.model(modelName, schema);
  }

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
    return this._model
      .find()
      .then((result) => {
        return result as T[];
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  // exrecise controller
  ExericesGroupByTags = () => {

  return this._model.aggregate([
    {
        $lookup: {
          from: "muscles",
          localField: "muscles",
          foreignField: "_id",
          as: "muscles"
        }
    },
    {
      $group: {
         "_id":"$tags",
        excercises: {$push:{id:"$_id", name:"$name", muscles: "$muscles"}},
      }
    }])
    .then((result) => {
      return result as T[]
    })
    .catch((error: Error) => {
        throw error;
      });
    }


    groupByTags = () => {

      return this._model.aggregate([
        {
        $lookup: {
          from: "exercises",
          localField: "exercises",
          foreignField: "_id",
          as: "exercises"
        },
        
      },
      {
        $group: {
          "_id":"$tags",
          trainings: {$push:{id:"$_id", name:"$name", excercises: "$exercises"}},
        }
      }, {
        $project: {
          _id: 1,
          trainings: 1,
        }
      }])
      .then((result) => {
      return result as T[]
    })
    .catch((error: Error) => {
        throw error;
      });
  }

}

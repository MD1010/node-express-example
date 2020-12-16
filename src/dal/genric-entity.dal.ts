import mongoose, { Document, Model, Schema } from "mongoose";
import {TrainingEntity,PostEntity,MuscleEntity,ExerciseEntity,TagEntity,UserEntity} from "../entities"
import {
  IReadEntity,
  IWriteEntity,
} from "../interfaces/generic-crud.interface";
import { toObjectId } from "./../utils/base-id";
import {Exceptions} from "../utils"

export class DbEnity<T extends Document>
  implements IReadEntity<T>, IWriteEntity<T> {
  protected _model: Model<Document>;

  constructor(modelName: string, schema: Schema) {
    this._model = mongoose.model(modelName, schema);
  }

  getModel = () => {
    return this._model;
  };

  async create(entity: T) {
    if (entity._id) {
      throw Exceptions.BAD_REQUEST;
    }
    if ((entity as Object).hasOwnProperty("name")) {
      const res = await this._model.findOne({ name: (entity as any).name });
      if (res) throw Exceptions.ENTITY_EXISTS;
    }
    return this._model
      .create(entity)
      .then((res) => {
        if (!res) {
          throw Exceptions.CREATE_FAILED;
        }
        return res as T;
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  updateOne(id: string, entity: T) {
    return this._model
      .updateOne({ _id: toObjectId(id) }, entity)
      .then((res) => {
        if (!res.nModified) {
          throw Exceptions.UPDATE_FAILED;
        }
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  deleteOne(id: string) {
    return this._model
      .deleteOne({ _id: toObjectId(id) })
      .then((res) => {
        if (!res.deletedCount) {
          throw Exceptions.DELETE_FAILED;
        }
      })
      .catch((error: Error) => {
        throw error;
      });
  }

  findOne(filter: { [key: string]: any }) {
    switch(this._model.modelName) {
      case TrainingEntity._model.modelName:
        return this._model
        .findOne(filter)
        .populate({
          path: "exercises",
          populate: {path: "muscles"}
        })
        .populate("tags")
        .then((result) => {
          return result as T;
        })
        .catch((error: Error) => {
          throw error;
        });
      case UserEntity._model.modelName:
        return this._model
        .findOne(filter)
        .populate({
          path: "exercises",
          populate: {path: "muscles"}
        })
        .populate("tags")
        .then((result) => {
          return result as T;
        })
        .catch((error: Error) => {
          throw error;
        });
      case ExerciseEntity._model.modelName:
        return this._model
        .findOne(filter)
        .populate("tag")
        .then((result) => {
          return result as T;
        })
        .catch((error: Error) => {
          throw error;
        });
      case TagEntity._model.modelName:
        return this._model
        .findOne(filter)
        .then((result) => {
          return result as T;
        })
        .catch((error: Error) => {
          throw error;
        });
      case PostEntity._model.modelName:
        return this._model
        .findOne(filter)
        .populate(
          {
          path: "trainingID",
          populate: [
            {
            path: "exercises",
            populate: {path: "muscles"}
            },
            {
              path: "tags"
            }
          ]
        },
        
        )
        .then((result) => {
          return result as T;
        })
        .catch((error: Error) => {
          throw error;
        });
     default:
      throw Exceptions.ENTITY_DOES_NOT_EXISTS;
    }





    // return this._model
    //   .findOne(filter)
    //   .then((result) => {
    //     return result as T;
    //   })
    //   .catch((error: Error) => {
    //     throw error;
    //   });
  }

  findAll() {
    switch(this._model.modelName) {
      case TrainingEntity._model.modelName:
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
      case UserEntity._model.modelName:
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
      case ExerciseEntity._model.modelName:
        return this._model
        .find()
        .populate("tag")
        .then((result) => {
          return result as T[];
        })
        .catch((error: Error) => {
          throw error;
        });
      case TagEntity._model.modelName:
        return this._model
        .find()
        .then((result) => {
          return result as T[];
        })
        .catch((error: Error) => {
          throw error;
        });
      case PostEntity._model.modelName:
        return this._model
        .find()
        .populate({
          path: "trainingID",
          populate: {
            path: "exercises",
            populate: {path: "muscles"}
          }
        })
        .then((result) => {
          return result as T[];
        })
        .catch((error: Error) => {
          throw error;
        });
     default:
        return [] as T[] 
    }

    // ////////
    // return this._model
    //   .find()
    //   .populate({
    //     path: "exercises",
    //     populate: {path: "muscles"}
    //   })
    //   .populate("tags")
    //   .then((result) => {
    //     return (result as T[]) || [];
    //   })
    //   .catch((error: Error) => {
    //     throw error;
    //   });
  }
}

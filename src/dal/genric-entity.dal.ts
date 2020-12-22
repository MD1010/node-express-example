import mongoose, { Document, Model, Schema } from "mongoose";
import { ExerciseEntity, MuscleEntity, MuscleGroupEntity, PostEntity, TrainingEntity, UserEntity } from "../entities";
import { IReadEntity, IWriteEntity } from "../interfaces/generic-crud.interface";
import { Exceptions } from "../utils";
import { toObjectId } from "./../utils/base-id";

export class DbEnity<T extends Document> implements IReadEntity<T>, IWriteEntity<T> {
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
      const res = await this._model.find({ name: (entity as any).name });
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

  async findOne(filter: { [key: string]: any }) {
    const [result] = await this.find(filter);
    return result;
  }

  find(filter: { [key: string]: any }, pageNumber?: string | undefined) {
    switch (this._model.modelName) {
      case TrainingEntity._model.modelName:
        return this._model
          .find(filter)
          .skip(pageNumber !== undefined ? (parseInt(pageNumber) - 1) * 6 : 0)
          .limit(pageNumber !== undefined ? 6 : 0)
          .populate({
            path: "exercises",
            populate: [{ path: "muscles.primary"}, { path: "muscles.secondary" }],
          })
          .populate({
            path: "musclesGroups",
            populate: { path: "muscles" },
          })
          .then((result) => {
            return result as T[];
          })
          .catch((error: Error) => {
            throw error;
          });
      case UserEntity._model.modelName:
        return (
          this._model
            .find(filter)
            .skip(pageNumber !== undefined ? (parseInt(pageNumber) - 1) * 6 : 0)
            .limit(pageNumber !== undefined ? 6 : 0)
            .populate({
              path: "exercises",
              populate: { path: "muscles" },
            })
            // .populate("tags")
            .then((result) => {
              return result as T[];
            })
            .catch((error: Error) => {
              throw error;
            })
        );
      case MuscleGroupEntity._model.modelName:
        return this._model
          .find(filter)
          .skip(pageNumber !== undefined ? (parseInt(pageNumber) - 1) * 6 : 0)
          .limit(pageNumber !== undefined ? 6 : 0)
          .populate("muscles")
          .then((result) => {
            return result as T[];
          })
          .catch((error: Error) => {
            throw error;
          });
      case ExerciseEntity._model.modelName:
        console.log(pageNumber);
        return this._model
          .find(filter)
          .skip(pageNumber !== undefined ? (parseInt(pageNumber) - 1) * 6 : 0)
          .limit(pageNumber !== undefined ? 6 : 0)
          .populate({
            path: "muscleGroup",
            populate: { path: "muscles" },
          })
          .populate("muscles.primary")
          .populate("muscles.secondary")
          .then((result) => {
            return result as T[];
          })
          .catch((error: Error) => {
            throw error;
          });
      case PostEntity._model.modelName:
        return this._model
          .find(filter)
          .skip(pageNumber !== undefined ? (parseInt(pageNumber) - 1) * 6 : 0)
          .limit(pageNumber !== undefined ? 6 : 0)
          .populate({
            path: "trainingID",
            populate: [
              {
                path: "exercises",
                populate: { path: "muscles" },
              },
              {
                path: "muscleGroups",
              },
            ],
          })
          .then((result) => {
            return result as T[];
          })
          .catch((error: Error) => {
            throw error;
          });
      case MuscleEntity._model.modelName:
        return this._model
          .find(filter)
          .skip(pageNumber !== undefined ? (parseInt(pageNumber) - 1) * 6 : 0)
          .limit(pageNumber !== undefined ? 6 : 0)
          .then((result) => {
            return result as T[];
          })
          .catch((error: Error) => {
            throw error;
          });
      default:
        throw Exceptions.ENTITY_DOES_NOT_EXISTS;
    }
  }
}

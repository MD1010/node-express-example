import { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { Exercise } from "../models";
import { TrainingEntity } from "./training.entity";
import { toObjectId } from "../utils/base-id";
import { UserEntity } from "./user.entity";

const ExerciseSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    video: { type: String, required: true },
    muscleGroup: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "MuscleGroup",
    },

    muscles: {
      primary: [{ type: Schema.Types.ObjectId, required: true, ref: "Muscle" }],
      secondary: [{ type: Schema.Types.ObjectId, ref: "Muscle" }],
    },
    image: { type: String, required: true },
    difficultyLevel: { type: Number, required: true },
    instructions: [{ type: String, required: true }],
  },
  { versionKey: false }
);

ExerciseSchema.post("remove", async (doc, next) => {
  const deletedExerciseID = doc._id;
  try {
    await TrainingEntity.getModel()
      .find()
      .then((trainings) => {
        Promise.all(
          trainings.map((training) => {
            TrainingEntity.getModel().update(
              { _id: toObjectId(training._id) },
              { $pull: { exercises: deletedExerciseID } },
              function (err, data) {
                if (err) {
                  console.log("not find id in training");
                } else {
                  console.log("delete in training");
                }
              }
            );
          })
        );
      });

    await UserEntity.getModel()
      .find()
      .then((users) => {
        Promise.all(
          users.map((user) => {
            UserEntity.getModel().update(
              {
                _id: user._id,
              },
              {
                $pull: {
                  "trainings.$[].exercises": {
                    exercise: toObjectId(deletedExerciseID),
                  },
                },
              },
              {
                upsert: false,
                new: true,
              },
              function (err, data) {
                if (err) {
                  console.log("not found in user");
                } else {
                  console.log("delete in user");
                }
              }
            );
          })
        );
      });
    next();
  } catch (err) {
    next(err);
  }
});

export const ExerciseEntity = new DbEnity<Exercise>("Exercise", ExerciseSchema);

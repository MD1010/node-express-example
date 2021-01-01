import { Schema } from "mongoose";
import { DbEnity } from "../dal/genric-entity.dal";
import { Training } from "../models";
import { PostEntity } from "./post.entity";
import { toObjectId } from "../utils/base-id";

const TrainingSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    musclesGroups: [{ type: Schema.Types.ObjectId, required: true, ref: "MuscleGroup" }],
    exercises: [{ type: Schema.Types.ObjectId, required: true, ref: "Exercise" }],
    video: { type: String, required: true },
    createdAt: { type: Schema.Types.Date, default: Date },
    numOfLikes: { type: Number, default: 0 },
    likedBy: [{ type: String, default: [] }],
    difficultyLevel: { type: Number, required: true },
    duration: { type: Number },
  },
  { versionKey: false }
);

TrainingSchema.post("remove", async (doc, next) => {
  const deletedTrainingID = doc._id;
  try {
    await PostEntity.getModel()
      .find({ trainingID: toObjectId(deletedTrainingID) })
      .then((posts) => {
        Promise.all(
          posts.map((post) => {
            PostEntity.deleteOne(post._id);
          })
        );
      });
    next();
  } catch (err) {
    next(err);
  }
});

export const TrainingEntity = new DbEnity<Training>("Training", TrainingSchema);

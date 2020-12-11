import { ExerciseEntity, TagEntity } from "../entities";
import { Exercise, Tag, Training } from "../models";
import { toObjectId } from "../utils/base-id";

export namespace ExerciseDAL {
  export const getExercisesByTag = async (tagName: string) => {
    const tag = await TagEntity.findOne({ name: tagName });
    return ExerciseEntity.getModel()
      .aggregate([
        {
          $match: { tag: toObjectId(tag._id) },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "muscles",
            foreignField: "_id",
            as: "muscles",
          },
        },
        {
          $lookup: {
            from: "tags",
            localField: "tag",
            foreignField: "_id",
            as: "tag",
          },
        },
      ])
      .then((result) => {
        return result as Exercise[];
      })
      .catch((error: Error) => {
        throw error;
      });
  };

  export const ExericesGroupByTags = () => {
    return ExerciseEntity.getModel()
      .aggregate([
        {
          $lookup: {
            from: "muscles",
            localField: "muscles",
            foreignField: "_id",
            as: "muscles",
          },
        },
        {
          $lookup: {
            from: "tags",
            localField: "tag",
            foreignField: "_id",
            as: "tag",
          },
        },
        {
          $group: {
            _id: "$tag",
            tag: {$first: "$tag"},
            excerices: {
              $push: { id: "$_id", name: "$name", description: "$description", url:"$url", muscles: "$muscles", difficulty: "$difficulty",
                      notes: "$notes", sets:"$sets", reps:"$reps", restTime: "$restTime", tag: "$tag"},
            },
          },
        },
        {
          $project: {
            _id: 0,
            tag: 1,
            excerices: 1
          }
        }
      ])
      .then((result) => {
        return result;
      })
      .catch((error: Error) => {
        throw error;
      });
  };
}

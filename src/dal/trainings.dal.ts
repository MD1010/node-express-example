import { ExerciseEntity, TrainingEntity } from "../entities";
import { Training } from "../models";
import { Request, Response } from "express";
import { toObjectId } from "../utils";

export namespace TrainingDAL {
  export const getTrainingsByName = (trainingName: string) => {
    return TrainingEntity.getModel()
      .aggregate([
        {
          $match: { name: trainingName },
        },
        {
          $lookup: {
            from: "exercises",
            localField: "exercises",
            foreignField: "_id",
            as: "exercises",
          },
        },
        {
          $lookup: {
            from: "muscleGroups",
            localField: "musclesGroups",
            foreignField: "_id",
            as: "musclesGroups",
          },
        },
        {
          $unwind: {
            path: "$exercises",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "exercises.muscles",
            foreignField: "_id",
            as: "exercises.muscles",
          },
        },
        {
          $lookup: {
            from: "muscleGroup",
            localField: "exercises.muscleGroup",
            foreignField: "_id",
            as: "exercises.muscleGroup",
          },
        },
        {
          $group: {
            _id: "$_id",
            trainingMuscleGroups: { $first: "$musclesGroups" },
            trainingName: { $first: "$name" },
            exercises: { $push: "$exercises" },
          },
        },
      ])
      .then((result) => {
        return result as Training[];
      })
      .catch((error: Error) => {
        throw error;
      });
  };

  export const groupByMuscleGroup = () => {
    return TrainingEntity.getModel()
      .aggregate([
        {
          $lookup: {
            from: "exercises",
            localField: "exercises",
            foreignField: "_id",
            as: "exercises",
          },
        },
        {
          $lookup: {
            from: "muscleGroups",
            localField: "musclesGroups",
            foreignField: "_id",
            as: "musclesGroups",
          },
        },
        {
          $unwind: {
            path: "$musclesGroups",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "musclesGroups.muscles",
            foreignField: "_id",
            as: "musclesGroups.muscles",
          },
        },
        {
          $unwind: {
            path: "$exercises",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "exercises.muscles.primary",
            foreignField: "_id",
            as: "exercises.muscles.primary",
          },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "exercises.muscles.secondary",
            foreignField: "_id",
            as: "exercises.muscles.secondary",
          },
        },
        {
          $lookup: {
            from: "muscleGroups",
            localField: "exercises.muscleGroup",
            foreignField: "_id",
            as: "exercises.muscleGroup",
          },
        },
        {
          $unwind: {
            path: "$exercises.muscleGroup",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "exercises.muscleGroup.muscles",
            foreignField: "_id",
            as: "exercises.muscleGroup.muscles",
          },
        },
        {
          $group: {
            _id: "$musclesGroups",
            group: { $push: "$musclesGroups.name" },
            trainingName: { $first: "$name" },
            trainingMuscleGroups: { $push: "$musclesGroups" },
            exercises: { $push: "$exercises" },
            likedBy: { $first: "$likedBy" },
            video: { $first: "$video" },
            createdAt: { $first: "$createdAt" },
            numOfLikes: { $first: "$numOfLikes" },
            difficultyLevel: { $first: "$difficultyLevel" },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ])
      .then((result) => {
        return result as Training[];
      })
      .catch((error: Error) => {
        throw error;
      });
  };

  export const updateLikes = async (
    objectId: string,
    userName: string,
    likesChange: number,
    objectType: string
  ) => {
    type entityType = typeof TrainingEntity | typeof ExerciseEntity;
    let entity: entityType;
    entity = objectType == "training" ? TrainingEntity : ExerciseEntity;
    if (likesChange == 1) {
      return entity.getModel().updateOne(
        {
          _id: toObjectId(objectId),
        },
        {
          $inc: {
            numOfLikes: likesChange,
          },

          $push: { likedBy: userName },
        }
      );
    } else {
      return TrainingEntity.getModel().updateOne(
        {
          _id: toObjectId(objectId),
        },
        {
          $inc: {
            numOfLikes: likesChange,
          },

          $pull: { likedBy: userName },
        }
      );
    }
  };
}

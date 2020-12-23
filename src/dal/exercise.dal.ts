import { IMuscleGroup } from "gymstagram-common";
import { ExerciseEntity, MuscleGroupEntity } from "../entities";
import { toObjectId } from "../utils/base-id";

export namespace ExerciseDAL {
  export const getExercisesByMuscleGroup = async (muscleGroupName: string) => {
    const muscleGroup = (await MuscleGroupEntity.findOne({ name: muscleGroupName })) as IMuscleGroup;
    return ExerciseEntity.getModel()
      .aggregate([
        {
          $match: { muscleGroup: toObjectId(muscleGroup._id!) },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "muscles.primary",
            foreignField: "_id",
            as: "muscles.primary",
          },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "muscles.secondary",
            foreignField: "_id",
            as: "muscles.secondary",
          },
        },
        {
          $lookup: {
            from: "muscleGroups",
            localField: "muscleGroup",
            foreignField: "_id",
            as: "muscleGroup",
          },
        },
        {
          $unwind: {
            path: "$muscleGroup",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "muscleGroup.muscles",
            foreignField: "_id",
            as: "muscleGroup.muscles",
          },
        },
      ])
      .then((result) => {
        return result;
      })
      .catch((error: Error) => {
        throw error;
      });
  };

  export const groupByMuscleGroup = () => {
    return ExerciseEntity.getModel()
      .aggregate([
        {
          $lookup: {
            from: "muscles",
            localField: "muscles.primary",
            foreignField: "_id",
            as: "muscles.primary",
          },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "muscles.secondary",
            foreignField: "_id",
            as: "muscles.secondary",
          },
        },
        {
          $lookup: {
            from: "muscleGroups",
            localField: "muscleGroup",
            foreignField: "_id",
            as: "muscleGroup",
          },
        },
        {
          $unwind: {
            path: "$muscleGroup",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "muscleGroup.muscles",
            foreignField: "_id",
            as: "muscleGroup.muscles",
          },
        },
        {
          $group: {
            _id: "$muscleGroup.name",
            group: { $first: "$muscleGroup.name" },
            exercises: {
              $push: {
                _id: "$_id",
                name: "$name",
                video: "$video",
                muscles: "$muscles",
                muscleGroup: "$muscleGroup",
                instructions: "$instructions",
                image: "$image",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            _v: 0,
          },
        },
      ])
      .then((result) => {
        return result;
      })
      .catch((error: Error) => {
        throw error;
      });
  };
}

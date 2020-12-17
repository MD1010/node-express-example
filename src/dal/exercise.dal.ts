import { ExerciseEntity, MuscleGroupEntity } from "../entities";
import { Exercise, MuscleGroup, Training } from "../models";
import { toObjectId } from "../utils/base-id";
import {IMuscleGroup} from "gymstagram-common"

export namespace ExerciseDAL {
  export const getExercisesByMuscleGroup = async (muscleGroupName: string) => {
    console.log(`reached!!! ${muscleGroupName}`)
    const muscleGroup = await MuscleGroupEntity.find({ name: muscleGroupName }) as IMuscleGroup[];
    return ExerciseEntity.getModel()
      .aggregate([
        {
          $match: { muscleGroup: toObjectId(muscleGroup[0]._id!) },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "muscles.primary",
            foreignField: "_id",
            as: "muscles.primary"
          }  
        },
        {
          $lookup: {
            from: "muscles",
            localField: "muscles.secondary",
            foreignField: "_id",
            as: "muscles.secondary"
          }  
        },
        {
          $lookup: {
            from: "muscleGroups",
            localField: "muscleGroup",
            foreignField: "_id",
            as: "muscleGroup"
          }  
        },
        {
          $unwind: {
            path: "$muscleGroup",
          preserveNullAndEmptyArrays: true
          }
        }, 
        {
          $lookup: {
            from: "muscles",
            localField: "muscleGroup.muscles",
            foreignField: "_id",
            as: "muscleGroup.muscles"
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

  export const groupByMuscleGroup = () => {
    console.log("reached2232323232")
    return ExerciseEntity.getModel()
      .aggregate([
        {
          $lookup: {
            from: "muscles",
            localField: "muscles.primary",
            foreignField: "_id",
            as: "muscles.primary"
          }  
        },
        {
          $lookup: {
            from: "muscles",
            localField: "muscles.secondary",
            foreignField: "_id",
            as: "muscles.secondary"
          }  
        },
        {
          $lookup: {
            from: "muscleGroups",
            localField: "muscleGroup",
            foreignField: "_id",
            as: "muscleGroup"
          }  
        },
        {
          $unwind: {
            path: "$muscleGroup",
          preserveNullAndEmptyArrays: true
          }
        }, 
        {
          $lookup: {
            from: "muscles",
            localField: "muscleGroup.muscles",
            foreignField: "_id",
            as: "muscleGroup.muscles"
          }
        },
        {
          $group: {
            "_id": "$muscleGroup",
            group: {$first: "$muscleGroup.name"},
            ExerciseName: {$first: "$name"},
            video: {$first: "$video"},
            muscles: {$first: "$muscles"},
            muscleGroup: {$first: "$muscleGroup"},
            instructions: {$first: "$instructions"},
            image: {$first: "$image"}
            // excerices: {
            //   $push: {
            //     id: "$_id",
            //     name: "$name",
            //     video: "$video",
            //     muscles: "$muscles",
            //     muscleGroup: "$muscleGroup",
            //     image
            //   },
            },
          },
        {
          $project: {
            "_id": 0,
            
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

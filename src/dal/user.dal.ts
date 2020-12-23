import { UserEntity } from "../entities";
import { toObjectId } from "../utils/base-id";

export namespace UserDAL {
  export const AddExcericeToDayTraining = async (username: string, exerciseID: string, personalPreferences: any) => {
    return UserEntity.getModel().update(
      {
        username: username,
      },
      {
        $push: {
          "trainings.$[elem].exercises": {
            exercise: toObjectId(exerciseID),
            reps: parseInt(personalPreferences.reps),
            sets: parseInt(personalPreferences.sets),
            restTime: parseInt(personalPreferences.restTime),
          },
        },
      },
      {
        upsert: true,
        arrayFilters: [{ "elem.day": parseInt(personalPreferences.day) }],
      }
    );
  };

  export const TrainingsByMuslceGroup = async (username: string, day: string) => {
    return UserEntity.getModel()
      .aggregate([
        {
          $match: { username: username },
        },
        {
          $unwind: {
            path: "$trainings",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: { "trainings.day": parseInt(day) },
        },
        {
          $unwind: {
            path: "$trainings.exercises",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "exercises",
            localField: "trainings.exercises.exercise",
            foreignField: "_id",
            as: "trainings.exercises.exercise",
          },
        },
        {
          $unwind: {
            path: "$trainings.exercises.exercise",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "trainings.exercises.exercise.muscles.primary",
            foreignField: "_id",
            as: "trainings.exercises.exercise.muscles.primary",
          },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "trainings.exercises.exercise.muscles.secondary",
            foreignField: "_id",
            as: "trainings.exercises.exercise.muscles.secondary",
          },
        },
        {
          $lookup: {
            from: "muscleGroups",
            localField: "trainings.exercises.exercise.muscleGroup",
            foreignField: "_id",
            as: "trainings.exercises.exercise.muscleGroup",
          },
        },
        {
          $unwind: {
            path: "$trainings.exercises.exercise.muscleGroup",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "muscles",
            localField: "trainings.exercises.exercise.muscleGroup.muscles",
            foreignField: "_id",
            as: "trainings.exercises.exercise.muscleGroup.muscles",
          },
        },
        {
          $group: {
            _id: "$trainings.exercises.exercise.muscleGroup",
            muscleGroup: { $first: "$trainings.exercises.exercise.muscleGroup.name" },
            exercises: { $push: "$trainings.exercises" },
          },
        },
        {
          $project: {
            _id: 0,
            muscleGroup: 1,
            exercises: 1,
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

import { UserEntity } from "../entities";

export namespace UserDAL {
  export const TrainingsByTags = async (username: string, day: string) => {
    return UserEntity.getModel()
      .aggregate([
        {
          $match: { username: username },
        },
        {
            $unwind: {
                path: "$trainings",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $match: { "trainings.day": parseInt(day) },
          },
        {
          $lookup: {
            from: "exercises",
            localField: "trainings.exercises",
            foreignField: "_id",
            as: "trainings.exercises",
          },
        },
        {
            $unwind: {
                path: "$trainings.exercises",
                preserveNullAndEmptyArrays: true
            }
        },
        {
          $lookup: {
            from: "muscles",
            localField: "trainings.exercises.muscles",
            foreignField: "_id",
            as: "trainings.exercises.muscles",
          },
        },
        {
          $lookup: {
            from: "tags",
            localField: "trainings.exercises.tag",
            foreignField: "_id",
            as: "trainings.exercises.tag",
          },
        },
        {
            $group: {
                "_id": "$trainings.exercises.tag",
                tag:{$first: "$trainings.exercises.tag"},
                exercises: {$push: "$trainings.exercises"}
            }
        },
        {
            $project: {
                "_id": 0,
                tag: 1,
                exercises: 1
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

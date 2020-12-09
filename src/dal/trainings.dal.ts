import { TrainingEntity } from "../entities"; 
import { Training } from "../models";

export namespace TrainingDAL {
  
   export const TrainingsGroupByTags = () => {
    return TrainingEntity.getModel().aggregate([
      {
        $lookup: {
          from: "exercises",
          localField: "exercises",
          foreignField: "_id",
          as: "exercises"
        }  
      },
      {
        $group: {
          "_id":"$tags",
          trainings: {$push:{id:"$_id", name:"$name", excercises: "$exercises"}},
        }
      },
      {
        $project: {
          _id: 1,
          trainings: 1,
        }
      }])
      .then((result) => {
      return result as Training[]
    })
    .catch((error: Error) => {
        throw error;
      });
  }
} 

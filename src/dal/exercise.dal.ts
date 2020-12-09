import { ExerciseEntity } from "../entities"; 
import { Exercise } from "../models";

export namespace ExerciseDAL {
    
  export const ExericesGroupByTags = () => {
    return ExerciseEntity.getModel().aggregate([
      {
          $lookup: {
            from: "muscles",
            localField: "muscles",
            foreignField: "_id",
            as: "muscles"
          }
      },
      {
        $lookup: {
          from: "tags",
          localField: "tag",
          foreignField: "_id",
          as: "tag"
        }
    },
      {
        $group: {
          "_id":"$tag",
          excercises: {$push:{id:"$_id", name:"$name", muscles: "$muscles"}},
        }
      }])
      .then((result) => {
        return result as Exercise[]
      })
      .catch((error: Error) => {
          throw error;
        });
  }
} 

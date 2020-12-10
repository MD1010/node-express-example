import { ExerciseEntity, TagEntity } from "../entities"; 
import { Exercise, Tag, Training } from "../models";
import {toObjectId2} from "../utils/base-id"

export namespace ExerciseDAL {
    
  export const getExercisesByTag = async (tagName: string) => {
    const tag =  await TagEntity.findOne({name: tagName})
    return ExerciseEntity.getModel().aggregate([
      {
        $match: {tag: toObjectId2(tag._id)}
      },
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
      }
      ])
      .then((result) => {
      return result as Training[]
    })
    .catch((error: Error) => {
        throw error;
      });
  }


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
          excerices: {$push:{id:"$_id", name:"$name", muscles: "$muscles"}},
        }
      }])
      .then((result) => {
        return result 
      })
      .catch((error: Error) => {
          throw error;
        });
  }
} 

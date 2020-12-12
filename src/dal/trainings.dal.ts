import { TrainingEntity } from "../entities"; 
import { Training } from "../models";
import { Request, Response } from "express";

export namespace TrainingDAL {
  
  export const getTrainingsByName = (trainingName: string) => {
    return TrainingEntity.getModel().aggregate([
      {
        $match: {name: trainingName}
      },
      {
        $lookup: {
          from: "exercises",
          localField: "exercises",
          foreignField: "_id",
          as: "exercises"
        }  
      },
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags"
        }  
      },
      { $unwind:{
        path: "$exercises",
        preserveNullAndEmptyArrays: true
        }  
    },
      {
        $lookup: {
          from: "muscles",
          localField: "exercises.muscles",
          foreignField: "_id",
          as: "exercises.muscles"
        }  
      },
      {
        $lookup: {
          from: "tags",
          localField: "exercises.tag",
          foreignField: "_id",
          as: "exercises.tag"
        }  
      },
      {
        $group: {
          "_id":"$_id",
          trainingTags: {$first:"$tags"},
          trainingName: {$first: "$name"},
          exercises: {$push:"$exercises" },
        }
      },
      ])
      .then((result) => {
      return result as Training[]
    })
    .catch((error: Error) => {
        throw error;
      });
  }

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
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags"
        }  
      },
      { $unwind:{
        path: "$exercises",
        preserveNullAndEmptyArrays: true
        }  
    },
      {
        $lookup: {
          from: "muscles",
          localField: "exercises.muscles",
          foreignField: "_id",
          as: "exercises.muscles"
        }  
      },
      {
        $lookup: {
          from: "tags",
          localField: "exercises.tag",
          foreignField: "_id",
          as: "exercises.tag"
        }  
      },
      {
        $group: {
          "_id":"$tags",
          exercises: {$push: "$exercises"},
          trainings: {$push:{id:"$_id", name:"$name"}},
        }
      },
      ])
      .then((result) => {
      return result as Training[]
    })
    .catch((error: Error) => {
        throw error;
      });
  }
} 

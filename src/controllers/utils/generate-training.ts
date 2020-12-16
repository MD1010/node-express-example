import { ITraining, ExerciseDifficulty, ITag } from "gymstagram-common";
import mongoose from "mongoose";
import { difficultiesLenght, getRandomInt, urlParse } from "./scrap-helpers";

export const generateTraining = (
  name: string,
  video: string,
  tags: ITag[]
): ITraining => {
  //parsing youtube url for client component
  const parsedVideo = urlParse(video);
  const randomIndexOfDifficultLevel = getRandomInt(difficultiesLenght);
  const difficultLevel = ExerciseDifficulty[randomIndexOfDifficultLevel];
  const createdAt = new Date();

  return {
    tags,
    exercises: [],
    video: parsedVideo,
    name,
    createdAt: createdAt,
    numOfLikes: 0,
    likedBy: [],
    difficultLevel: difficultLevel,
  };
};

// https://www.youtube.com/watch?v=UBMk30rjy0o&feature=youtu.be
//  youtu.be => www.youtube.com/embed

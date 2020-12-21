import { IMuscleGroup, Difficulty } from "gymstagram-common";
import { difficultiesLenght, getRandomInt } from "./scrap-helpers";

export const generateTraining = (
  name: string,
  video: string,
  tags: IMuscleGroup[]
) => {
  const randomIndexOfDifficultLevel = getRandomInt(0, difficultiesLenght);
  const difficultyLevel = Difficulty[randomIndexOfDifficultLevel];
  const createdAt = new Date();

  return {
    tags,
    exercises: [],
    video,
    name,
    createdAt: createdAt,
    numOfLikes: 0,
    likedBy: [],
    difficultyLevel,
  };
};

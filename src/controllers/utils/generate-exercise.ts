import { exerciseRouter } from "../../routes";
import { Difficulty, IExercise } from "gymstagram-common";
import { toObjectId } from "../../utils";
import { ObjectId } from "mongodb";
import {
  difficultiesLenght as difficultiesLength,
  getRandomInt,
} from "./scrap-helpers";

export const generateExercise = (names: string[], videos: string[]) => {
  let releventNames: string[] = names.slice(2);
  let releventVideos: string[] = videos.slice(2);
  type dbExercise =
    | Pick<IExercise, Exclude<keyof IExercise, "tag">>
    | { tag: ObjectId };

  let exercise: dbExercise;
  let exercises: dbExercise[] = [];

  let tag: ObjectId = new ObjectId();

  let tagsMap = {
    16: "5fc82b4469562b1584bed618",
    37: "5fcbe6846674f842d41c6bf1",
    61: "5fc82b4969562b1584bed619",
    73: "5fce9896ce03938cf6e3560d",
    90: "5fce9880ce03938cf6e3560c",
    100: "5fd9edb551ba7f0e4095d9fd",
  };
  let setsOptions = [2, 3, 4];
  let repsOptions = [6, 8, 10, 12, 15];
  let restTimeOptions = [30, 45, 60, 75, 90];
  let namesLenght = releventNames.length;
  let setOptionsLenght = setsOptions.length;
  let repsOptionsLenght = repsOptions.length;
  let restTimeOptionsLenght = restTimeOptions.length;

  for (let index = 0; index < namesLenght; index++) {
    switch (true) {
      case index >= 0 && index <= 16:
        tag = toObjectId(tagsMap[16]);
        break;
      case index >= 17 && index <= 37:
        tag = toObjectId(tagsMap[37]);
        break;
      case index >= 36 && index <= 61:
        tag = toObjectId(tagsMap[61]);
        break;
      case index >= 60 && index <= 73:
        tag = toObjectId(tagsMap[73]);
        break;
      case index >= 72 && index <= 90:
        tag = toObjectId(tagsMap[90]);
        break;
      case index >= 91 && index <= 100:
        tag = toObjectId(tagsMap[100]);
        break;
    }
    exercise = {
      name: releventNames[index],
      video: releventVideos[index],
      difficulty: getRandomInt(0, difficultiesLength),
      sets: setsOptions[getRandomInt(0, setOptionsLenght)],
      reps: repsOptions[getRandomInt(0, repsOptionsLenght)],
      restTime: restTimeOptions[getRandomInt(0, restTimeOptionsLenght)],
      tag,
    };
    exercises.push(exercise);
  }

  console.log(exercises.length);
};

import { ExerciseDifficulty } from "gymstagram-common";

export let difficultiesLenght = Object.keys(ExerciseDifficulty).length;

export function getRandomInt(maxNotInclude: number) {
  return Math.floor(Math.random() * Math.floor(maxNotInclude));
}

export function urlParse(url: string) {
  if (url.includes("youtu.be")) {
    url.replace("youtu.be", "www.youtube.com/embed");
    return url;
  } else {
    url.replace("watch?v=", "embed/");
    return url;
  }
}

import { Difficulty } from "gymstagram-common";
import { toNamespacedPath } from "path";

export let difficultiesLenght = Object.keys(Difficulty).length / 2;

export function getRandomInt(minInclude: number, maxNotInclude: number) {
  minInclude = Math.ceil(minInclude);
  maxNotInclude = Math.floor(maxNotInclude);
  return Math.floor(Math.random() * (maxNotInclude - minInclude) + minInclude); //The maximum is exclusive and the minimum is inclusive
}
export function generateRandomDate(
  rangeOfDays: number,
  startHour: number,
  hourRange: number
) {
  const today = new Date(Date.now());
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - Math.random() * rangeOfDays,
    Math.random() * hourRange + startHour,
    Math.random() * 60
  );
}

// export function urlParse(url: string) {
//   if (url.includes("youtu.be")) {
//     url = url.replace("youtu.be", "www.youtube.com/embed");
//     return url;
//   } else {
//     url = url.replace("watch?v=", "embed/");
//     return url;
//   }
// }

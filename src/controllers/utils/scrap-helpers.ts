import { Difficulty } from "gymstagram-common";

export let difficultiesLenght = Object.keys(Difficulty).length / 2;

export function getRandomInt(minInclude: number, maxNotInclude: number) {
  minInclude = Math.ceil(minInclude);
  maxNotInclude = Math.floor(maxNotInclude);
  return Math.floor(Math.random() * (maxNotInclude - minInclude) + minInclude); //The maximum is exclusive and the minimum is inclusive
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

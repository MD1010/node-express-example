import { List } from "lodash";
function getRandomInt(maxNotInclude: number) {
  return Math.floor(Math.random() * Math.floor(maxNotInclude));
}

let trainingsDifficultLevel = [
  "Easy",
  "Normal",
  "Difficult",
  "Hard",
  "Exteme",
  "Insane",
];
export const generateTraining = (name: string, video: string, tags: []) => {
  //parsing youtube url for client component
  const parsedVideo = video.replace("youtu.be", "www.youtube.com/embed");
  const createdAt = new Date();
  const randomIndexOfDifficultLevel = getRandomInt(
    trainingsDifficultLevel.length
  );
  const difficultLevel = trainingsDifficultLevel[randomIndexOfDifficultLevel];

  return {
    tags: tags,
    exercises: [],
    video: parsedVideo,
    name: name,
    createdAt: createdAt,
    numOfLikes: 0,
    likedBy: [],
    difficultLevel: difficultLevel,
  };
};

// https://www.youtube.com/watch?v=UBMk30rjy0o&feature=youtu.be
//  youtu.be => www.youtube.com/embed

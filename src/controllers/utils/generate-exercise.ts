import axios from "axios";
import { JSDOM } from "jsdom";
import youtube from "scrape-youtube";
import {
  ExerciseEntity,
  MuscleEntity,
  MuscleGroupEntity,
} from "../../entities";
import {IMuscle} from "gymstagram-common"

let MAIN_SCRAP_URL = "https://www.freetrainers.com";
export const scrapData = async () => {
  try {
    //getting the musclesGroupPage ( main page, our entry point to the scraping)
    let allMusclesGroupPage = await axios.get(
      `${MAIN_SCRAP_URL}/exercise/muscle/`
    );
    const dom = new JSDOM(allMusclesGroupPage.data);

    let musclesGroups = dom.window.document.querySelectorAll(
      "body > div > div > div > div > ul > li > a"
    );
    //for each muscle group we entering one layer inside
    await Promise.all(
      Array.from(musclesGroups)
        .slice(0, musclesGroups.length - 1)
        .map(async (muscleGroup) => {
          let muscleGroupUrl = `${MAIN_SCRAP_URL}${muscleGroup.getAttribute(
            "href"
          )}`;
          let specificMusclesGroupPage = await axios.get(muscleGroupUrl);

          const muscleGroupPageDom = new JSDOM(specificMusclesGroupPage.data);
          let createdMusclesIds = await generateMuscles(muscleGroupPageDom);

          const createdMuscleGroupId = await generateMusclesGroup(
            createdMusclesIds,
            muscleGroupPageDom
          );
          let exercises = muscleGroupPageDom.window.document.querySelectorAll(
            ".panel>h5>a"
          );
          await Promise.all(
            Array.from(exercises).map(async (exercise) => {
              let exerciseUrl = `${MAIN_SCRAP_URL}${exercise.getAttribute(
                "href"
              )}`;
              let exerciseObject = await scrapExercise(exerciseUrl);
              await generateExercise(exerciseObject, createdMuscleGroupId);
            })
          );
        })
    );
  } catch (e) {
    throw e;
  }
};

export const generateMuscles = async (dom: JSDOM) => {
  const createdMusclesIds: any[] = [];

  let muscles = dom.window.document.querySelectorAll(
    "body > div > div > div > div.columns.large-8 > ul > li> a"
  );
  await Promise.all(
    Array.from(muscles).map(async (muscle) => {
      let muscleUrl = `${MAIN_SCRAP_URL}${muscle.getAttribute("href")}`;
      let muscleId = await generateMuscle(muscleUrl);
      createdMusclesIds.push(muscleId);
    })
  );

  return createdMusclesIds;
};
export const generateMuscle = async (muscleUrl: string) => {
  let specificMusclesPage = await axios.get(muscleUrl);
  const dom = new JSDOM(specificMusclesPage.data);
  const muscleObject = scrapeMusclesEntitiesDetails(dom);
  let createdMuscle = await MuscleEntity.create(muscleObject as any);
  console.log("Created muscle");
  return createdMuscle._id;
};

async function generateMusclesGroup(createdMusclesIds: any[], dom: JSDOM) {
  const muscleGroupObject = scrapeMusclesEntitiesDetails(dom);
  const finalMuscleGroupObjectToDb = {
    ...muscleGroupObject,
    muscles: createdMusclesIds,
  };
  let createdMuscleGroup = await MuscleGroupEntity.create(
    finalMuscleGroupObjectToDb as any
  );
  console.log("Created muscleGroup");
  return createdMuscleGroup._id;
}

function scrapeMusclesEntitiesDetails(dom: JSDOM) {
  let name = dom.window.document
    .querySelector(".columns>h1")
    ?.textContent?.trim();
  let description = dom.window.document
    .querySelector(".columns > p")
    ?.textContent?.trim();
  let image = `${MAIN_SCRAP_URL}${dom.window.document
    .querySelector("#body_map-15~img")
    ?.getAttribute("src")}`;

  return { name, description, image };
}

async function scrapExercise(exerciseUrl: string) {
  let specificExercisePage = await axios.get(exerciseUrl);
  const dom = new JSDOM(specificExercisePage.data);
  let name = dom.window.document
    .querySelector(".columns>h1")
    ?.textContent!.trim()!;
  let image = `${MAIN_SCRAP_URL}${dom.window.document
    .querySelector(".show-for-medium-up>li>img")
    ?.getAttribute("src")}`;
  let video = await (await youtube.search(name)).videos[0].link;

  let instructions: any[] = [];
  let primaryMuscles: any[] = [];
  let secondaryMuscles: any[] = [];
  let instructionsUlElement = dom.window.document.querySelector(
    ".show-for-small-down~ul"
  )?.children!;

  Array.from(instructionsUlElement).map((instruction) => {
    instructions.push(instruction.textContent?.trim());
  });
  let primaryMusclesSection = dom.window.document.querySelectorAll(
    "tbody>tr>td"
  )[0].children;
  let secondaryMusclesSection = dom.window.document.querySelectorAll(
    "tbody>tr>td"
  )[1].children;

  Array.from(primaryMusclesSection).map((muscle) => {
    primaryMuscles.push(muscle.textContent?.trim());
  });

  Array.from(secondaryMusclesSection).map((muscle) => {
    secondaryMuscles.push(muscle.textContent?.trim());
  });

  return {
    name,
    image,
    video,
    instructions,
    muscles: { primary: primaryMuscles, secondary: secondaryMuscles },
  };
}
async function generateExercise(
  exerciseObject: any,
  createdMuscleGroupId: string
) {
  let primaryIds: any[] = [];
  let secondaryIds: any[] = [];
  let finalExercise;
  await Promise.all(
    exerciseObject.muscles.primary.map(async (primaryMuscle: any) => {
      const res = await MuscleEntity.find({ name: primaryMuscle }) as IMuscle;
      if (res) {
        primaryIds.push(res._id);
      }
    })
  );
  await Promise.all(
    exerciseObject.muscles.secondary.map(async (secondaryMuscle: any) => {
      const res = await MuscleEntity.find({ name: secondaryMuscle }) as IMuscle;
      if (res) {
        secondaryIds.push(res._id);
      }
    })
  );

  finalExercise = {
    ...exerciseObject,
    muscles: { primary: primaryIds, secondary: secondaryIds },
    muscleGroup: createdMuscleGroupId,
  };

  await ExerciseEntity.create(finalExercise as any);
  console.log("Created Exercise");
}

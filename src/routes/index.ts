import {
  ExerciseController,
  MuscleController,
  PostController,
  TagController,
  TrainingController,
} from "../controllers";
import { Exercise, Muscle, Post, Tag, Training } from "../models";
import { CrudRouter } from "./crud-router";
export { adminRouter } from "./admin.route";

export const exerciseRouter = new CrudRouter<Exercise>(
  ExerciseController
).getRouter();

export const muscleRouter = new CrudRouter<Muscle>(
  MuscleController
).getRouter();

export const tagRouter = new CrudRouter<Tag>(TagController).getRouter();

export const trainingRouter = new CrudRouter<Training>(
  TrainingController
).getRouter();

export const postRouter = new CrudRouter<Post>(PostController).getRouter();

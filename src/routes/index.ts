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
  new ExerciseController()
).getRouter();

export const muscleRouter = new CrudRouter<Muscle>(
  new MuscleController()
).getRouter();
export const tagRouter = new CrudRouter<Tag>(new TagController()).getRouter();
export const trainingRouter = new CrudRouter<Training>(
  new TrainingController()
).getRouter();
export const postRouter = new CrudRouter<Post>(
  new PostController()
).getRouter();

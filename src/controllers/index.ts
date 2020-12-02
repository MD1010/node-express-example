import { ExerciseEntity, TrainingEntity } from "../entities";
import { MuscleEntity } from "../entities/muscle.entity";
import { Exercise, Muscle, Post, Tag } from "../models";
import { PostEntity } from "./../entities/post.entity";
import { TagEntity } from "./../entities/tag.entity";
import { Training } from "./../models/training.model";
import { CrudEntityController } from "./crud-entity.controller";

export { AdminController } from "./admin.controller";
export const ExerciseController = new CrudEntityController<Exercise>(
  ExerciseEntity
);
export const MuscleController = new CrudEntityController<Muscle>(MuscleEntity);
export const PostController = new CrudEntityController<Post>(PostEntity);
export const TagController = new CrudEntityController<Tag>(TagEntity);
export const TrainingController = new CrudEntityController<Training>(
  TrainingEntity
);

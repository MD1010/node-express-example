import { Exercise } from "../models";
import { ExerciseEntity } from "../entities/exercise.entity";
import { GenericCrudController } from "./generic-crud.controller";

export class ExerciseController extends GenericCrudController<Exercise> {
  constructor() {
    super(ExerciseEntity);
  }
}

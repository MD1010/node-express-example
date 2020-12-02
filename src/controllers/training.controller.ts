import { Training } from "../models";
import { TrainingEntity } from "./../entities/training.entity";
import { GenericCrudController } from "./generic-crud.controller";

export class TrainingController extends GenericCrudController<Training> {
  constructor() {
    super(TrainingEntity);
  }
}

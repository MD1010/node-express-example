import { ITraining } from "../models";
import { TrainingEntity } from "./../entities/training.entity";
import { GenericCrudController } from "./generic-crud.controller";

export class TrainingController extends GenericCrudController<ITraining> {
  constructor() {
    super(TrainingEntity);
  }
}

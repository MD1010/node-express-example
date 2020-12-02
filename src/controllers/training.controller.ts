import { Training } from "../models";
import { TrainingEntity } from "./../entities";
import { GenericCrudController } from "./generic-crud.controller";

export class TrainingController extends GenericCrudController<Training> {
  constructor() {
    super(TrainingEntity);
  }
}

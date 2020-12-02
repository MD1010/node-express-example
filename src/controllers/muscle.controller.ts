import { Muscle } from "../models";
import { MuscleEntity } from "./../entities/muscle.entity";
import { GenericCrudController } from "./generic-crud.controller";

export class MuscleController extends GenericCrudController<Muscle> {
  constructor() {
    super(MuscleEntity);
  }
}

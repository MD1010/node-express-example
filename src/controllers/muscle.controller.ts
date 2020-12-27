import { MuscleEntity } from "../entities";
import { Muscle } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";

export class MuscleController extends GenericCrudController<Muscle> {
  constructor() {
    super(MuscleEntity);
  }

  getAllMuscles = this.getEntities;
  createMuscle = this.createEntity;
  getMuscle = this.getEntityById;
  updateMuscle = this.updateEntity;
  deleteMuscle = this.deleteEntity;
}

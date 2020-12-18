import { Muscle } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import { MuscleEntity } from "../entities";

export class MuscleController extends GenericCrudController<Muscle> {
  constructor() {
    super(MuscleEntity);
  }

  getAllMuscles = this.getAllEntites;
  createMuscle = this.createEntity;
  getMuscle = this.getEntityById;
  updateMuscle = this.updateEntity;
  deleteMuscle = this.deleteEntity;
}

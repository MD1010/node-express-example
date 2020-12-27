import { MuscleGroupEntity } from "../entities";
import { MuscleGroup } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";

export class MuscleGroupController extends GenericCrudController<MuscleGroup> {
  constructor() {
    super(MuscleGroupEntity);
  }
  getAllMuscleGroups = this.getEntities;
  createMuscleGroup = this.createEntity;
  getMuscleGroup = this.getEntityById;
  updateMuscleGroup = this.updateEntity;
  deleteMuscleGroup = this.deleteEntity;
}

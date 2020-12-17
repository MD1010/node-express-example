import { MuscleGroup } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";
import { MuscleGroupEntity } from "../entities";

export class MuscleGroupController extends GenericCrudController<MuscleGroup> {
  constructor() {
    super(MuscleGroupEntity);
  }
  getAllMuscleGroups = this.getAllEntites;
  createMuscleGroup = this.createEntity;
  getMuscleGroup = this.getEntityById;
  updateMuscleGroup = this.updateEntity;
  deleteMuscleGroup = this.deleteEntity;
}

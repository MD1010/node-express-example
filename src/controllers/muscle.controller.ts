import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { Muscle } from "../models";
import { GenericCrudController } from "./utils/generic-crud.controller";

export class MuscleController extends GenericCrudController<Muscle> {
  getAllMuscles = this.getAllEntites;
  createMuscle = this.createEntity;
  getMuscle = this.getEntityById;
  updateMuscle = this.updateEntity;
  deleteMuscle = this.deleteEntity;
}

import { IMuscleGroup } from "gymstagram-common";
import { Document } from "mongoose";

type Model = Document & IMuscleGroup;
export interface MuscleGroup extends Model {}

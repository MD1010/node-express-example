import { IExercise } from "gymstagram-common";
import { Document } from "mongoose";

type Model = Document & IExercise;
export interface Exercise extends Model {}

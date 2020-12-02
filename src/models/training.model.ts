import { ITraining } from "gymstagram-common";
import { Document } from "mongoose";

type Model = Document & ITraining;
export interface Training extends Model {}

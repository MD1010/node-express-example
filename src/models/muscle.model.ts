import { IMuscle } from "gymstagram-common";
import { Document } from "mongoose";

type Model = Document & IMuscle;
export interface Muscle extends Model {}

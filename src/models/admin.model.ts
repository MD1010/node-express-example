import { IAdmin } from "gymstagram-common";
import { Document } from "mongoose";

type Model = Document & IAdmin;
export interface Admin extends Model {}

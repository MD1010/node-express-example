import { ITag } from "gymstagram-common";
import { Document } from "mongoose";

type Model = Document & ITag;
export interface Tag extends Model {}

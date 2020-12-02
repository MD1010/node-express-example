import { IPost } from "gymstagram-common";
import { Document } from "mongoose";

type Model = Document & IPost;
export interface Post extends Model {}

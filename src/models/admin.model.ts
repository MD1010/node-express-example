import mongoose, { Schema, Document } from "mongoose";
import { IAdmin } from "gymstagram-common";

type Model = Document & IAdmin;
export interface Admin extends Model {}

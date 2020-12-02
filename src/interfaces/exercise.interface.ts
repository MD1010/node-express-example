import mongoose, { Schema, Document } from "mongoose";
import { ExerciseDifficulty } from "../enums/exercise-difficulty.enum";

export interface IExercise extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  url: string;
  muscles: mongoose.Types.ObjectId[];
  difficulty: ExerciseDifficulty;
  notes: string;
  sets: number;
  reps: number;
  restTime: number;
}

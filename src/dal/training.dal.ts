import { Training } from '../interfaces/training.interface';
import {TrainingModel} from "../models/training.model";

export class TrainingDAL {
    static async createTraining(training: Training) {
        return await TrainingModel.create(training);
      }
}
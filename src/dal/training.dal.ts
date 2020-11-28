import { Training } from '../interfaces/training.interface';
import {TrainingModel} from "../models/training.model";

export class TrainingDAL {
    static async createTraining(training: Training) {
        // create mongoose funcion for insert new doc
        //return await TrainingModel.create(training);
      }
}
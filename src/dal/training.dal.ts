import { Training } from "../interfaces";

<<<<<<< HEAD
export class TrainingDAL {
    static async createTraining(training: Training) {
        // create mongoose funcion for insert new doc
        //return await TrainingModel.create(training);
      }
}
=======
export namespace TrainingDAL {
  export async function createTraining(training: Training) {
    // return await TrainingModel.create(training);
  }
}
>>>>>>> master

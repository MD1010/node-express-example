import { ExerciseController } from "./../controllers";
import { Router } from "express";

export const exerciseRouter = Router();
const exerciseController = new ExerciseController();

// api/exercise/(chest | arms)

exerciseRouter.get("/", exerciseController.getAllExercises);
exerciseRouter.get("/tag/:name", exerciseController.getExercisesByTag);
exerciseRouter.get("/groupByTags", exerciseController.groupByTags);
exerciseRouter.post("/", exerciseController.createExercise);
exerciseRouter.put("/:id", exerciseController.updateExercise);
exerciseRouter.get("/:id", exerciseController.getExercise);
exerciseRouter.delete("/:id", exerciseController.deleteExercise);


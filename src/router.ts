import { Request, Response, Router } from "express";
import { scrapData } from "./controllers/utils/generate-exercise";
import {
  ExerciseEntity,
  MuscleEntity,
  MuscleGroupEntity,
  TrainingEntity,
} from "./entities";
import {
  userRouter,
  exerciseRouter,
  trainingRouter,
  muscleGroupRouter,
  muscleRouter,
  postRouter,
} from "./routes";
import { errorHandler } from "./utils/errorHandler";

export const appRouter = Router();

appRouter.use("/api/user", userRouter);
appRouter.use("/api/exercise", exerciseRouter);
appRouter.use("/api/training", trainingRouter);
appRouter.use("/api/tag", muscleGroupRouter);
appRouter.use("/api/muscle", muscleRouter);
appRouter.use("/api/post", postRouter);

appRouter.get("/check", (req, res) => {
  res.send("ok");
});

appRouter.post(
  "/scrap",
  errorHandler(async (req: Request, res: Response) => {
    await scrapData();
    res.send();
  })
);
appRouter.delete("/delete", async (req, res) => {
  await ExerciseEntity.getModel().deleteMany({});
  await MuscleGroupEntity.getModel().deleteMany({});
  await MuscleEntity.getModel().deleteMany({});
  res.send();
});
appRouter.use("*", (req, res) => {
  res.status(404).send("Invalid Route");
});

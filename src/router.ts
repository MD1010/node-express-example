import { Request, Response, Router } from "express";
import { scrapData } from "./controllers/utils/scrape";

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

appRouter.use("/api/users", userRouter);
appRouter.use("/api/exercises", exerciseRouter);
appRouter.use("/api/trainings", trainingRouter);
appRouter.use("/api/tags", muscleGroupRouter);
appRouter.use("/api/muscles", muscleRouter);
appRouter.use("/api/posts", postRouter);

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

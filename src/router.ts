import { Router } from "express";
import {
  adminRouter,
  exerciseRouter,
  trainingRouter,
  tagRouter,
  muscleRouter,
} from "./routes";

export const appRouter = Router();

appRouter.use("/api/admin", adminRouter);
appRouter.use("/api/exercise", exerciseRouter);
appRouter.use("/api/training", trainingRouter);
appRouter.use("/api/tag", tagRouter);
appRouter.use("/api/muscle", muscleRouter);

appRouter.use("*", (req, res) => {
  res.status(404).send("Invalid Route");
});

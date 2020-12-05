import { Router } from "express";
import {
  adminRouter,
  exerciseRouter,
  trainingRouter,
  tagRouter,
  muscleRouter,
  postRouter,
} from "./routes";

export const appRouter = Router();

appRouter.use("/api/admin", adminRouter);
appRouter.use("/api/exercise", exerciseRouter);
appRouter.use("/api/training", trainingRouter);
appRouter.use("/api/tag", tagRouter);
appRouter.use("/api/muscle", muscleRouter);
appRouter.use("/api/post", postRouter);

appRouter.get("/check", (req, res) => {
  res.send("ok");
});
appRouter.use("*", (req, res) => {
  res.status(404).send("Invalid Route");
});

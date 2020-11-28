import { Router } from "express";
import { exerciseRouter } from "./routes/exercise.route";
import { adminRouter } from "./routes/admin.route";
import { trainingRouter } from "./routes/training.route";
import { muscleRouter } from "./routes/muscle.route";
import { tagRouter } from "./routes/tag.route";

export const appRouter = Router();

appRouter.use("/api/admin", adminRouter);
appRouter.use("/api/exercise", exerciseRouter);
appRouter.use("/api/training", trainingRouter);
appRouter.use("/api/tag", tagRouter);
appRouter.use("/api/muscle", muscleRouter);

appRouter.use("*", (req, res) => {
  res.status(404).send("Invalid Route");
});

import { Request, Response, Router } from "express";
import { scrapData } from "./controllers/utils/scrape";
import { ExerciseEntity, MuscleEntity, MuscleGroupEntity } from "./entities";
import { exerciseRouter, muscleGroupRouter, muscleRouter, postRouter, trainingRouter, userRouter } from "./routes";
import { authenticateJWT } from "./utils/auth";
import { errorHandler } from "./utils/errorHandler";

export const appRouter = Router();

appRouter.use("/api/users", userRouter);
appRouter.use("/api/exercises", authenticateJWT, exerciseRouter);
appRouter.use("/api/trainings", authenticateJWT, trainingRouter);
appRouter.use("/api/muscleGroups", authenticateJWT, muscleGroupRouter);
appRouter.use("/api/muscles", authenticateJWT, muscleRouter);
appRouter.use("/api/posts", authenticateJWT, postRouter);

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
appRouter.delete("/scrap", async (req, res) => {
  await ExerciseEntity.getModel().deleteMany({});
  await MuscleGroupEntity.getModel().deleteMany({});
  await MuscleEntity.getModel().deleteMany({});
  res.send();
});
appRouter.use("*", (req, res) => {
  res.status(404).send("Invalid Route");
});

import { Router } from "express";
import { myRouter } from "./routes";

export const appRouter = Router();

appRouter.use("/my", myRouter);

appRouter.get("/check", (req, res) => {
  res.send("ok");
});

appRouter.use("*", (req, res) => {
  res.status(404).send("Invalid Route");
});

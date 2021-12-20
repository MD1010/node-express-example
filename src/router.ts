import { Router } from "express";
import { Sequelize } from "sequelize";
import { userRouter } from "./routes";

export const appRouter = Router();

appRouter.use("/users", userRouter);

appRouter.get("/check", (req, res) => {
  res.send("ok");
});

appRouter.use("*", (req, res) => {
  res.status(404).send("Invalid Route");
});

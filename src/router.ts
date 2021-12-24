import { Router } from "express";
import { Sequelize } from "sequelize";
import { userRouter } from "./routes";

export const appRouter = Router();

// !! if you want to avoid this you can do it like /check (specify full endpoint path)
appRouter.use("/users", userRouter);

// appRouter.get("/users/add", (req, res) => {
//   res.send("ok");
// });

appRouter.get("/check", (req, res) => {
  res.send("ok");
});

appRouter.use("*", (req, res) => {
  res.status(404).send("Invalid Route");
});

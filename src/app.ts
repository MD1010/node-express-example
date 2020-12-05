import * as bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { Application } from "express";
import { createServer } from "http";
import { SocketManager } from "./helpers/socketManager";
import { appRouter } from "./router";

function useMiddlewares(app: Application) {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(appRouter);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use((error: any, req: any, res: any, next: any) => {
    return res.status(error.code || 500).json({ error: error.message });
  });
}

dotenv.config();
const app = express();
export const http = createServer(app);
useMiddlewares(app);
http.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
SocketManager.initSocketManager();

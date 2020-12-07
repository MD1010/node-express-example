import * as bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { Application } from "express";
import { createServer } from "http";
import { appRouter } from "./router";
import { SocketManager } from "./utils/socketManager";
import connect from "./db.connect";

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
connect(process.env.DB_CONNECTION_STRING);
SocketManager.initSocketManager();
http.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);

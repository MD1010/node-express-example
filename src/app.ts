import * as bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import { createServer } from "http";
import { connectDB } from "./db.connect";
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
async function main() {
  const app = express();
  const http = createServer(app);
  useMiddlewares(app);
  await connectDB();
  http.listen(5000, () => console.log(`Server listening on port 5000`));
}
main();

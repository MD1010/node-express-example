import * as bodyParser from "body-parser";
import cors from "cors";
import express, { Application, Response } from "express";
import { createServer } from "http";
import { connectDB } from "./db.init";
import { appRouter } from "./router";

function useMiddlewares(app: Application) {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(appRouter); // !!HERE!!
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use((error: any, req: any, res: Response, next: any) => {
    return res.status(error.code || 500).json({ error: error.message });
  });
}
async function main() {
  const app = express(); // !! init server
  const http = createServer(app);
  http.listen(5000, () => console.log(`Server listening on port 5000`));

  await connectDB();
  // !! routes logic in appRouter !!HERE!!
  useMiddlewares(app);
}
main();

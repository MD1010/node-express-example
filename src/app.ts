import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express, { Application } from "express";
import { appRouter } from "./router";
import connect from "./db.connect";

namespace Server {
  let app: Application;

  export function initApp(): Application {
    if (app) return app;

    app = express();
    useMiddlewares(app);
    connect(process.env.DB_CONNECTION_STRING);
    app.listen(process.env.PORT, () =>
      console.log(`Server listening on port ${process.env.PORT}`)
    );
    return app;
  }

  function useMiddlewares(app: Application) {
    app.use(bodyParser.json());
    app.use(appRouter);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use((error: any, req: any, res: any, next: any) => {
      return res.status(error.code).json({ error: error.message });
    });
  }
}

dotenv.config();
Server.initApp();

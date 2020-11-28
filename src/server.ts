import express from 'express';
import * as bodyParser from 'body-parser';
import { config } from './config';
import { appRouter } from './router';

export class Server {
  public app: express.Application;

  private static serverInstance: Server;

  public static startServer() {
    if (!this.serverInstance) {
      this.serverInstance = new Server();
    }
    return this.serverInstance;
  }

  constructor() {
    this.app = express();
    this.useMiddlewares();
    this.app.use(appRouter);
    this.app.listen(process.env.PORT, () =>
      console.log(`Server listening on port ${config.server.port}`)
    );
  }

  private useMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
}

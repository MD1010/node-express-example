// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// import express, { Application } from "express";

// const app: Application = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/check", (req, res) => {
//   return res.send(200);
// });

// app.listen(5000, () => {
//   console.log("app listening on port 5000");
// });

import { Server } from './server';
import * as dotenv from "dotenv";


(async () => {
  dotenv.config({ path: __dirname+'/.env' });
  Server.startServer();
})();

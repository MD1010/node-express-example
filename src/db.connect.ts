import mongoose from "mongoose";
import { Sequelize } from "sequelize";
export const connectDB = async () => {
  try {
    const sequelize = new Sequelize("mysql://admin:nxTjYEgu@163.123.183.84:17204/test_db");
    await sequelize.authenticate();
    console.log("successfully connected to db");
  } catch (e) {
    console.error(e);
  }

  // try {
  //   mongoose
  //     .connect(db, {})
  //     .then(() => {
  //       return console.info(`Successfully connected to ${db}`);
  //     })
  //     .catch((error) => {
  //       console.error("Error connecting to database: ", error);
  //       return process.exit(1);
  //     });
  // } catch (e) {
  //   connect();
  // }

  // mongoose.connection.on("disconnected", connect);
};

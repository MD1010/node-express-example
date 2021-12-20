import mongoose from "mongoose";
import { DataTypes, Sequelize } from "sequelize";

export const sequelize = new Sequelize("mysql://admin:nxTjYEgu@163.123.183.84:17204/test_db");

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("successfully connected to db");
  } catch (e) {
    console.error(e);
  }
};

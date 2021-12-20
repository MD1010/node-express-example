import mongoose from "mongoose";
export const connectDB = async () => {
  const connect = () => {
    try {
      const db = process.env.CONNECTION_STRING!;
      mongoose
        .connect(db, {})
        .then(() => {
          return console.info(`Successfully connected to ${db}`);
        })
        .catch((error) => {
          console.error("Error connecting to database: ", error);
          return process.exit(1);
        });
    } catch (e) {
      console.error(e);
    }
  };

  mongoose.connection.on("disconnected", connect);
};

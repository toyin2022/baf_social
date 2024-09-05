import mongoose from "mongoose";

export const connection = async () => {
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => console.log({ error: err }));
};

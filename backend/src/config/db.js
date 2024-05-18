import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGODB_URI;

export const connectDb = async () => {
  await mongoose.connect(URI);
  console.log("Conexion exitosa");
};

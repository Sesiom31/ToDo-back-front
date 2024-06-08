import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGODB_URI;

export const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Conexion exitosa");
  } catch (err) {
    console.error("Error al conectar a MONGODB", err);
    throw err;
  }
};

import express from "express";
import userRoutes from "./routes/userRoutes.js";
import  cookieParser from 'cookie-parser'

export const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/api", userRoutes);

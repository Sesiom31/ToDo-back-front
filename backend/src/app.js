import express from "express";
import userRoutes from "./routes/userRoutes.js";

export const app = express();

app.use(express.json());
app.use("/api", userRoutes);

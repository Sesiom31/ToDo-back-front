import express from "express";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://task-list-mu-flame.vercel.app"]
      : ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", taskRouter);


// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

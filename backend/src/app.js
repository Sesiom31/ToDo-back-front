import express from "express";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

export const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://task-list-5cx9etgf6-sesiom31s-projects.vercel.app"]
      : ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", taskRouter);

// Servir archivos estáticos en producción
/* if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}
 */

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

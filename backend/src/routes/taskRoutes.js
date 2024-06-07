import { Router } from "express";
import { verifyToken } from "../middlewares/validateToken.middleware.js";
import { validateDatos } from "../middlewares/validateDatos.middleware.js";
import { taskSchema } from "../schemas/task.schema.js";
import {
  createTask,
  deleteTask,
  getTasks,
  updateFieldTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = Router();

router.get("/tasks", verifyToken, getTasks);

router.post("/tasks", verifyToken, validateDatos(taskSchema), createTask);

router.patch("/task", verifyToken, updateFieldTask);

router.put(
  "/task/:id",
  verifyToken,
  validateDatos(taskSchema),
  updateTask
);

router.delete("/task/:id", verifyToken, deleteTask);


export default router;

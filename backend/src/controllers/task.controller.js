import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const getTasks = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id);
  } catch (err) {}
};

export const getTask = async (req, res) => {};

export const createTask = async (req, res) => {
  try {
    const { task, description, isImportant, dateEnd, pasos, user } = req.body;
    const newTask = new Task({
      task,
      description,
      isImportant,
      dateEnd,
      pasos,
      user,
    });

    await newTask.save();
    console.log(newTask)

    res.status(201).json({ newTask });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error al crear una nueva tarea:", err });
  }
};

export const updateTask = async (req, res) => {};

export const deleteTask = async (req, res) => {};

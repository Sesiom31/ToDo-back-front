import { Task } from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id);
    const tasks = await Task.find({ user: id });
    res.status(200).json({ tasks });
  } catch (err) {
    console.log(err);
  }
};

export const getTask = async (req, res) => {};

export const createTask = async (req, res) => {
  try {
    const {
      task,
      description,
      isImportant,
      isComplete,
      pasos,
      belongsCategories,
      dateEnd,
      user,
    } = req.body;
    const newTask = new Task({
      task,
      description,
      isImportant,
      isComplete,
      pasos,
      belongsCategories,
      dateEnd,
      user,
    });

    await newTask.save();
    console.log(newTask);

    res.status(201).json({ newTask });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error al crear una nueva tarea:", err });
  }
};

export const updateTask = async (req, res) => {};

export const updateFieldTask = async (req, res) => {
  try {
    const { taskId, field, newValue } = req.body;

    const fields = ["isImportant", "isComplete"];
    console.log(fields);

    if (!fields.includes(field))
      return res
        .status(400)
        .json({ message: "Campo no permitido para actualización" });

    const updateQuery = {
      [field]: newValue,
    };

    if (field === "isImportant") {
      if (newValue)
        updateQuery.$addToSet = { belongsCategories: "importantes" };
      else updateQuery.$pull = { belongsCategories: "importantes" };
    } else if (field === "isComplete") {
      if (newValue)
        updateQuery.$addToSet = { belongsCategories: "completadas" };
      else updateQuery.$pull = { belongsCategories: "completadas" };
    }
    const updateTask = await Task.findByIdAndUpdate(taskId, updateQuery, {
      new: true,
      runValidators: true,
    });

    if (!updateTask)
      return res.status(404).json({ message: "Tarea no encontrada" });

    res.status(200).json({ updateTask });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

export const deleteTask = async (req, res) => {};

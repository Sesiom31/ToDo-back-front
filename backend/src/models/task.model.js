import mongoose from "mongoose";

const pasoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    description: { type: String, required: true },
    isImportant: { type: Boolean, default: false },
    isComplete: { type: Boolean, default: false },
    pasos: [pasoSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);

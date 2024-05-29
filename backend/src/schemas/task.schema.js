import { z } from "zod";

const pasoSchema = z.object({
  description: z.string().min(1, "La description es requerida"),
  isComplete: z.boolean().default(false),
});

export const taskSchema = z.object({
  task: z.string().min(1, "El titulo es requerido"),
  description: z.string().min(1, "La descripcion es requerida"),
  isImportant: z.boolean().default(false).optional(),
  isComplete: z.boolean().default(false).optional(),
  pasos: z.array(pasoSchema).optional(),
  user: z
    .string()
    .min(1, "El usuario es requerido")
    .regex(/^[0-9a-fA-F]{24}$/, "Usuario inválido").optional(),
});

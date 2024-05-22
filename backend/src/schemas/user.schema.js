import { z } from "zod";

const userSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Firstname debe tener al menos 3 caracteres" }),
  lastname: z
    .string()
    .min(3, { message: "Lastname debe tener al menos 3 caracteres" }),
  username: z
    .string()
    .min(4, { message: "Username debe tener al menos 4 caracteres" }),
  email: z.string().email({ message: " Ingresa un email valido" }),
  passwod: z
    .string()
    .min(6, { message: "Password debe tener al menos 6 caracteres" }),
});

import { z } from "zod"

export const createUserSchema = z.object({
  email: z.email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  cellphone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number")
    .optional()
})
import { z } from "zod"

export const createUserSchema = z.object({

  email: z
    .email("Invalid email format"),

  username: z
    .string()
    .min(3, "Username must have at least 3 characters")
    .max(30, "Username too long"),

  name: z
    .string()
    .min(2, "Name must have at least 2 characters"),

  lastName: z
    .string()
    .min(2, "Last name must have at least 2 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  cellphone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number")
    .optional()
})
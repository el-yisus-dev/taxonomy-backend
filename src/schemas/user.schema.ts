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
}).strict();


export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is too short")
    .optional(),
  lastName: z
    .string()
    .min(1, "LastName is too short")
    .optional(),
  cellphone: z
    .string()
    .regex(/^(\+52\s?)?(\d{2,3}-?\d{3}-?\d{4})$/, "Invalid phone number")
    .optional()
})
  .refine(data => Object.keys(data).length > 0, {
    message: "Please provide the data that you want to submit"
})
.strict();
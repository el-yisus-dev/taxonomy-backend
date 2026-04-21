import { z } from "zod"

const requiredString = (field: string) =>
  z
    .string({ error: `The ${field} is required` })
    .trim()
    .min(1, { error: `The ${field} cannot be empty` })

export const optionalString = (field: string) =>
  z
    .string({ error: `The ${field} must be a string` })
    .trim()
    .min(1, { error: `The ${field} cannot be empty` })
    .optional()


export const createUserSchema = z.object({
  email: z
    .string({ error: "The email is required" })
    .trim()
    .min(1, { error: "The email is required" })
    .email({ error: "Invalid email format" }),

  username: z
    .string({ error: "The username is required" })
    .trim()
    .min(3, { error: "Username must have at least 3 characters" })
    .max(30, { error: "Username cannot exceed 30 characters" }),

  name: z
    .string({ error: "The name is required" })
    .trim()
    .min(2, { error: "Name must have at least 2 characters" }),

  lastName: z
    .string({ error: "The last name is required" })
    .trim()
    .min(2, { error: "Last name must have at least 2 characters" }),

  password: z
    .string({ error: "The password is required" })
    .min(8, { error: "Password must be at least 8 characters" }),

  cellphone: z
    .string({ error: "Cellphone must be a string" })
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, { error: "Invalid phone number" })
    .optional()
}).strict()

// UPDATE
export const updateUserSchema = z.object({
  name: optionalString("name"),

  lastName: optionalString("last name"),

  cellphone: z
    .string({ error: "Cellphone must be a string" })
    .trim()
    .regex(/^(\+52\s?)?(\d{2,3}-?\d{3}-?\d{4})$/, {
      error: "Invalid phone number"
    })
    .optional()
})
.refine(data => Object.keys(data).length > 0, {
  message: "You must provide at least one field to update"
})
.strict()

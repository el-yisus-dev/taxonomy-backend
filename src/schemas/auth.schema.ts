import { z } from 'zod'

export const loginUserSchema = z.object({
  identifier: z
    .string({ error: "Username or email is required" })
    .trim()
    .min(1, { error: "Username or email is required" }),

  password: z
    .string({ error: "Password is required" })
    .min(1, { error: "Password is required" })
})

export const paramEmailTokenSchema = z.object({
    token: z
        .string({ error: "token is missing" })
        .trim()
        .min(10, { error: "invalid token format"})
})

export const emailTokenSchema = z.object({
  email: z
    .string({ error: "The email is required" })
    .trim()
    .min(1, { error: "The email is required" })
    .email({ error: "Invalid email format" }),
})
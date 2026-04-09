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

export const resetPasswordSchema = z.object({
  email: z
    .string({ error: "The email is required" })
    .trim()
    .min(1, { error: "The email is required" })
    .email({ error: "Invalid email format" }),
  code: z
    .string({ error: "the code is required"})
    .min(6, { error: "It must have 6 characters"})
    .max(6, { error: "It must have 6 characters"}),
  password: z
    .string({ error: "The password is required" })
    .trim()
    .min(1, { error: "The password is required" })
});
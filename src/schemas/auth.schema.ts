import { z } from 'zod'

const emailRegex = /\S+@\S+\.\S+/;

export const loginUserSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, { message: "Username or email is required" })
    .refine((value) => {
      if (value.includes("@")) {
        return emailRegex.test(value);
      }
      return true;
    }, {
      message: "Invalid email format",
    }),

  password: z.string().min(1, { message: "Password is required" }),
});

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
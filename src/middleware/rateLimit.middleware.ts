import rateLimit from "express-rate-limit";

export const sentEmailsRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 5, // 5 requests
  message: {
    status: "error",
    message: "Too many requests, please try again later",
  },
});
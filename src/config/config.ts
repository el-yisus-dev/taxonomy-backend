import { configDotenv } from "dotenv";

configDotenv();

export const config = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  NODE_ENV: process.env.NODE_ENV,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  URL_FRONTEND: process.env.FRONTEND_URL
};
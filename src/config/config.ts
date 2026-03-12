import { configDotenv } from "dotenv"

configDotenv();

export const config  =  {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DATABASE_URL
}
import { configDotenv } from "dotenv"

configDotenv();

export const config  =  {
    PORT: process.env.PORT || 3000 
}
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { config } from "../config/config.js"


const adapter = new PrismaPg({
  connectionString: config.DB_URL 
})

export const prisma = new PrismaClient({
  adapter
})
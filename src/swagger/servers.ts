import { config } from "../config/config.js" 

export const SERVERS = [
    {
        url: `http://localhost:${config.PORT}/api/v1`,
        description: "Local server"
    }
]
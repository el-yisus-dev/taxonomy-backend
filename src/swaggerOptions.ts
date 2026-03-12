import swaggerJsdoc from "swagger-jsdoc";
import { INFO } from "./swagger/info.js";
import { SERVERS } from "./swagger/servers.js";
import { SECURITY } from "./swagger/security.js";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: INFO,
        servers: SERVERS,
        components: {
            securitySchemes: SECURITY,

        }
    },
    apis: ["./src/routes/*ts"]
}

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec
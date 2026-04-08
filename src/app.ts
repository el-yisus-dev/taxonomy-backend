import express from "express";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';
import cors from "cors";

import { config } from "./config/config.js";
import { routerApi } from "./routes/index.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

import swaggerJsdoc from "./swaggerOptions.js";
import { getCORS, RATE_LIMIT_SETTINGS, SWAGGER_OPTIONS } from "./settings.js";

const app = express();

// Middleware to response in json format 
app.use(express.json());

if (config.NODE_ENV !== 'development') {
    // Middleware to delimit the number of requests
    app.use(rateLimit(RATE_LIMIT_SETTINGS))
}

// Config Cors
app.use(cors(getCORS()))


// Middleware to show logs in the console
app.use(morgan("dev"));

// Set up about swagger
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc, SWAGGER_OPTIONS));

// Dishable header powered-by
app.disable('x-powered-by');

// Routes
routerApi(app);

// Middleware to handle errors
app.use(errorMiddleware);
console.log(config)
app.listen(config.PORT, () => {
    console.log(`working on: http://localhost:${config.PORT}/api/v1/docs`);
})
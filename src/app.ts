import express from "express";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express'

import { config } from "./config/config.js";
import { routerApi } from "./routes/index.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

import swaggerJsdoc from "./swaggerOptions.js";

const app = express();

// Middleware to response in json format 
app.use(express.json());

// Middleware to show logs in the console
app.use(morgan("dev"));

// Set up about swagger
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

// Dishable header powered-by
app.disable('x-powered-by');

// Routes
routerApi(app);

// Middleware to handle errors
app.use(errorMiddleware);

app.listen(config.PORT, () => {
    console.log(`working on: http://localhost:${config.PORT}`);
})
import express from "express";
import morgan from "morgan";

import { config } from "./config/config.js";
import { routerApi } from "./routes/index.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

// Middleware to response in json format 
app.use(express.json());

app.use(morgan("dev"));

// Routes
routerApi(app);

// Middleware to handle errors
app.use(errorMiddleware);

app.listen(config.PORT, () => {
    console.log(`working on: http://localhost:${config.PORT}`);
})
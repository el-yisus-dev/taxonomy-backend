import express from "express";
import morgan from "morgan";


import { routerApi } from "./routes/index.routes.js";
import { config } from "./config/config.js";

const app = express();

// Middleware to response in json format 
app.use(express.json());

app.use(morgan("tiny"));

app.get("/", (req, res) => {
    res.status(200).json({
        "status": "exito",
        data: {
            message: "First steps master in the app u.ur"
        }
    })
})

routerApi(app);

app.listen(config.PORT, () => {
    console.log(`working on: http://localhost:${config.PORT}`);
})
import express from "express";

import { config } from "./config/config.js";
const app = express();

// Middleware to response in json format 
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        "status": "exito",
        data: {
            message: "First steps master in the app u.ur"
        }
    })
})


app.listen(config.PORT, () => {
    console.log(`working on: http://localhost:${config.PORT}`);
})
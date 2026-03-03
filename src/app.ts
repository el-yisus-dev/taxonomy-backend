import express from "express";

const app = express();

const port = 9222;

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


app.listen(port, () => {
    console.log(`working on: http://localhost:${port}`);
})
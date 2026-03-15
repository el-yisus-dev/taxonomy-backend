import { Router, type Express } from "express"

import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";


const routerApi = (app: Express) => {
    
    const router = Router();
    
    app.get("/", (req, res) => {
        res.status(200).json({
            "status": "exito",
            data: {
                message: "First steps master in the app u.ur"
            }
        })
    })

    app.use("/api/v1", router);

    router.use("/users", userRouter);
    router.use("/auth", authRouter);

}

export {
    routerApi
}
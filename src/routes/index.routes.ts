import { Router, type Express } from "express"

import authRouter from "./auth.routes.js";
import taxonRouter from "./taxon.routes.js";
import observationsRouter from "./observation.routes.js";
import userRouter from "./user.routes.js";
import { ApiError } from "../utils/ApiError.js";


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

    router.use("/auth", authRouter);
    router.use("/taxons", taxonRouter);
    router.use("/observations", observationsRouter);
    router.use("/users", userRouter);

    app.use((req, res, next) => {
       throw new ApiError(404, `Can't find ${req.originalUrl} on this server`);
    });
    
}

export {
    routerApi
}
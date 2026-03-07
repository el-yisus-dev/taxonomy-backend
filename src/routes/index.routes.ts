import { Router } from "express"

import userRouter from "./user.routes.js";


const routerApi = (app) => {
    
    const router = Router();

    app.use("/api/v1",router);

    router.use("/users", userRouter);

}

export {
    routerApi
}
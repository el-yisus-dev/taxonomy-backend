import { Router, type Express } from "express"

import userRouter from "./user.routes.js";


const routerApi = (app: Express) => {
    
    const router = Router();

    app.use("/api/v1", router);

    router.use("/users", userRouter);

}

export {
    routerApi
}
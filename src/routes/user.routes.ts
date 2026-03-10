import { Router } from "express";

import { createUser, deleteUser, getUserById, getUsers } from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


const router = Router()

router.post("/", validate(createUserSchema), asyncHandler(createUser));

router.get("/", getUsers);

router.get("/:id", getUserById);

router.delete("/:id", deleteUser);

export default router
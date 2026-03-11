import { Router } from "express";

import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


const router = Router()

router.post("/", validate(createUserSchema), asyncHandler(createUser));

router.get("/", asyncHandler(getUsers));

router.get("/:id", asyncHandler(getUserById));

router.patch("/:id", asyncHandler(updateUser));

router.delete("/:id", asyncHandler(deleteUser));

export default router
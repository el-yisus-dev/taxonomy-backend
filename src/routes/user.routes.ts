import { Router } from "express";

import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { idParamSchema } from "../schemas/id.schema.js";


const router = Router()

router.post("/", validate(createUserSchema), asyncHandler(createUser));

router.get("/", asyncHandler(getUsers));

router.get("/:id", validate(idParamSchema, "params"), asyncHandler(getUserById));

router.put("/:id", validate(idParamSchema, "params"), validate(updateUserSchema), asyncHandler(updateUser));

router.delete("/:id", validate(idParamSchema, "params"), asyncHandler(deleteUser));

export default router
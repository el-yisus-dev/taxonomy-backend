import { Router } from "express"
import { createUser, deleteUser, getUserById, getUsers } from "../controllers/user.controller.js"


const router = Router()

router.post("/", createUser)

router.get("/", getUsers)

router.get("/:id", getUserById)

router.delete("/:id", deleteUser)

export default router
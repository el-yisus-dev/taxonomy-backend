import { Router } from "express";

import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { idParamSchema } from "../schemas/id.schema.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { verifyRole } from "../middleware/acl.middleware.js";
import { Role } from "../types/User.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users
 */

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user account in the system
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - name
 *               - lastName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: moon@example.com
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 example: moonwalker
 *               name:
 *                 type: string
 *                 example: Michael
 *               lastName:
 *                 type: string
 *                 example: Jackson
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: strongpassword123
 *               cellphone:
 *                 type: string
 *                 example: "+5215512345678"
 *
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         email:
 *                           type: string
 *                           example: moon@example.com
 *                         username:
 *                           type: string
 *                           example: moonwalker
 *                         name:
 *                           type: string
 *                           example: Michael
 *                         lastName:
 *                           type: string
 *                           example: Jackson
 *                         cellphone:
 *                           type: string
 *                           example: "+5215512345678"
 *
 *       400:
 *         description: Validation error
 *
 *       409:
 *         description: Email or username already exists
 *
 *       500:
 *         description: Internal server error
 */
router.post("/", validate(createUserSchema), asyncHandler(createUser));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get paginated list of users
 *     description: Returns a paginated list of users (ADMIN only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of users per page
 *
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *
 *       403:
 *         description: Forbidden - insufficient permissions
 *
 *       401:
 *         description: Unauthorized - missing or invalid token
 *
 *       500:
 *         description: Internal server error
 */
router.get("/", asyncHandler(verifyToken), asyncHandler(verifyRole([Role.ADMIN])), asyncHandler(getUsers));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", asyncHandler(verifyToken), validate(idParamSchema, "params"), asyncHandler(getUserById));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user information
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: User updated successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Validation error
 */
router.put("/:id", asyncHandler(verifyToken) ,validate(idParamSchema, "params"), validate(updateUserSchema), asyncHandler(updateUser));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Soft delete a user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", asyncHandler(verifyToken), validate(idParamSchema, "params"), asyncHandler(deleteUser));

export default router
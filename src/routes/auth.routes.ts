import { Router } from "express";

import { validate } from "../middleware/validate.middleware.js";
import { login, requestPasswordReset, resendVerification, resetPassword, verifyEmail } from "../controllers/auth.controller.js";
import { emailTokenSchema, loginUserSchema, paramEmailTokenSchema, resetPasswordSchema } from "../schemas/auth.schema.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints for authentication 
 */

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user and return access token
 *     description: Authenticates a user using username or email and password, returns JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Username or email of the user
 *                 example: yisusdev
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: pelos2008
 *
 *     responses:
 *       200:
 *         description: Login successful
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
 *                         username:
 *                           type: string
 *                           example: moonwalker
 *                         email:
 *                           type: string
 *                           example: moon@example.com
 *                         name:
 *                           type: string
 *                           example: Michael
 *                         lastName:
 *                           type: string
 *                           example: Jackson
 *                         role:
 *                           type: string
 *                           example: user
 *                         avatarUrl:
 *                           type: string
 *                           nullable: true
 *                           example: https://example.com/avatar.png
 *                         cellphone:
 *                           type: string
 *                           nullable: true
 *                           example: "+5215512345678"
 *                     accessToken:
 *                       type: string
 *                       description: JWT access token
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *
 *       500:
 *         description: Internal server error
 */
router.post("/login", validate(loginUserSchema), asyncHandler(login));

/**
 * @swagger
 * /auth/email-verification/confirm:
 *   get:
 *     summary: Verify user email using verification token
 *     description: |
 *       Verifies a user's email address using a token sent via email during registration.
 *       The token must be valid and not expired.
 *
 *     tags:
 *       - Auth
 *
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Email verification token
 *         example: 9f8c7a6b5e4d3c2b1a...
 *
 *     responses:
 *       200:
 *         description: Email successfully verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Email verified successfully
 *
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid or expired token
 *
 *       500:
 *         description: Internal server error
 */
router.get("/email-verification/confirm", validate(paramEmailTokenSchema, "query"), asyncHandler(verifyEmail))

/**
 * @swagger
 * /auth/email-verification/resend:
 *   post:
 *     summary: Resend email verification token
 *     description: Sends a new email verification token if the user is not yet verified
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *
 *     responses:
 *       200:
 *         description: Verification email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Verification email sent
 *
 *       400:
 *         description: Email already verified or invalid
 *
 *       500:
 *         description: Internal server error
 */
router.post("/email-verification/resend", validate(emailTokenSchema), asyncHandler(resendVerification))

/**
 * @swagger
 * /auth/password-reset/request:
 *   post:
 *     summary: Request password reset
 *     description: Sends an OTP code to the user's email
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent
 */
router.post("/password-reset/request", validate(emailTokenSchema), asyncHandler(requestPasswordReset))

/**
 * @swagger
 * /auth/password-reset/confirm:
 *   post:
 *     summary: Reset user password using OTP
 *     description: Validates OTP and updates password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 example: "123456"
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
router.post("/password-reset/confirm", validate(resetPasswordSchema), asyncHandler(resetPassword))


export default router;
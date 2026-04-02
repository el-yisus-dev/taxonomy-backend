import { Router } from 'express';

import { verifyToken } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { validate } from '../middleware/validate.middleware.js';

import { createTaxonSchema } from '../schemas/taxon.schema.js';
import { createTaxon } from '../controllers/taxon.controller.js';

/**
 * @swagger
 * tags:
 *   name: Taxons
 *   description: Endpoints for managing taxons
 */

const router = Router();

/**
 * @swagger
 * /taxons:
 *   post:
 *     summary: Create a new taxon
 *     description: Creates a new taxon in the system
 *     tags:
 *       - Taxons
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rank
 *               - name
 *             properties:
 *               rank:
 *                 type: string
 *                 example: SPECIES
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: Patula
 *               parentId:
 *                 type: number
 *                 example: 12
 *               description:
 *                 type: string
 *                 example: "Only Lives in Mexico"
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
 *                     taxon:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         rank:
 *                           type: string
 *                           example: Homo
 *                         name:
 *                           type: String
 *                           example: Sapiens
 *                         description:
 *                           type: string
 *                           example: "Lives around the world"
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
router.post('/', asyncHandler(verifyToken), validate(createTaxonSchema), asyncHandler(createTaxon))

export default router
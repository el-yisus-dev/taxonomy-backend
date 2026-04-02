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
 *     description: |
 *       Creates a new taxon in the system.
 *       
 *       ### Rules:
 *       - rank must be a valid taxonomic rank.
 *       - name will be stored in lowercase.
 *       - parentId:
 *         - Must NOT be provided if rank is DOMAIN.
 *         - Optional for other ranks (can be assigned later).
 *       - A taxon with the same name and rank cannot exist.
 *       - Hierarchy must be valid (e.g., SPECIES cannot be parent of GENUS).
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
 *                 enum: [DOMAIN, KINGDOM, PHYLUM, CLASS, ORDER, FAMILY, GENUS, SPECIES]
 *                 example: DOMAIN
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 example: Bacteria
 *               parentId:
 *                 type: integer
 *                 nullable: true
 *                 example: 12
 *               description:
 *                 type: string
 *                 example: "Microscopic single-celled organisms"
 *
 *     responses:
 *       201:
 *         description: Taxon created successfully
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
 *                           example: DOMAIN
 *                         name:
 *                           type: string
 *                           example: bacteria
 *                         parentId:
 *                           type: integer
 *                           nullable: true
 *                           example: null
 *                         description:
 *                           type: string
 *                           nullable: true
 *                           example: "Microscopic single-celled organisms"
 *                         createdBy:
 *                           type: integer
 *                           example: 1
 *
 *       400:
 *         description: |
 *           Validation or hierarchy error:
 *           - Invalid hierarchy
 *           - ParentId provided for DOMAIN
 *
 *       404:
 *         description: |
 *           Resource not found:
 *           - Parent taxon not found
 *           - Taxon already exists at this rank
 *
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *
 *       409:
 *         description: Duplicate taxon (unique constraint violation)
 *
 *       500:
 *         description: Internal server error
 */
router.post('/', asyncHandler(verifyToken), validate(createTaxonSchema), asyncHandler(createTaxon))

export default router
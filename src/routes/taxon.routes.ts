import { Router } from 'express';

import { verifyToken } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { validate } from '../middleware/validate.middleware.js';

import { createTaxonSchema } from '../schemas/taxon.schema.js';
import { createTaxon, deleteTaxon, getAllTaxons, getTaxonById, updateTaxon } from '../controllers/taxon.controller.js';
import { verifyRole } from '../middleware/acl.middleware.js';
import { Role } from '../types/User.js';
import { idParamSchema } from '../schemas/id.schema.js';

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
router.post('/', asyncHandler(verifyToken), validate(createTaxonSchema), asyncHandler(createTaxon));

/**
 * @swagger
 * /taxons:
 *   get:
 *     summary: Get all taxons (paginated)
 *     description: |
 *       Returns a paginated list of taxons ordered by creation date (descending).
 *       
 *       ### Features:
 *       - Pagination via page and limit (internally uses skip)
 *       - Optional filtering by parentId
 *       - Optional inclusion of related data (creator)
 *       - Sorted by newest first
 *       - Soft-deleted records are excluded
 *       - Requires authentication
 *       
 *       ### parentId behavior:
 *       - Not provided → returns all taxons
 *       - parentId=null → returns taxons without parent (roots or unassigned)
 *       - parentId=<number> → returns direct children of that taxon
 *
 *       ### include behavior:
 *       - include=creator → includes creator user info
 *       
 *     tags:
 *       - Taxons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number (default = 1)
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page (default = 10)
 *
 *       - in: query
 *         name: parentId
 *         required: false
 *         schema:
 *           type: string
 *           example: "1"
 *         description: |
 *           Filter by parent taxon:
 *           - Use a number to get children of a taxon
 *           - Use "null" to get taxons without parent
 *
 *       - in: query
 *         name: include
 *         required: false
 *         schema:
 *           type: string
 *           example: creator
 *         description: |
 *           Include related resources:
 *           - creator → includes user information (username, name, lastName)
 *
 *     responses:
 *       200:
 *         description: List of taxons retrieved successfully
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: sapiens
 *                       rank:
 *                         type: string
 *                         example: SPECIES
 *                       parentId:
 *                         type: integer
 *                         nullable: true
 *                         example: 10
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "Modern humans"
 *                       validationStatus:
 *                         type: string
 *                         example: PENDING
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-04-02T12:00:00.000Z"
 *
 *                       creator:
 *                         type: object
 *                         nullable: true
 *                         description: Only included if include=creator
 *                         properties:
 *                           username:
 *                             type: string
 *                             example: yisusdev
 *                           name:
 *                             type: string
 *                             example: Jesús
 *                           lastName:
 *                             type: string
 *                             example: Estrada
 *
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *
 *       400:
 *         description: Invalid query parameters (e.g., parentId is not a number)
 *
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *
 *       500:
 *         description: Internal server error
 */
router.get('/', asyncHandler(verifyToken), asyncHandler(getAllTaxons));


router.get('/:id', asyncHandler(verifyToken), asyncHandler(getTaxonById));

 /**
 * @swagger
 * /taxons/{id}:
 *   put:
 *     summary: Update a taxon
 *     description: |
 *       Updates an existing taxon.
 *
 *       ### Business rules:
 *       - Only the owner can update the taxon if the role is USER
 *       - USER can only update taxons with status PENDING
 *       - MODERATOR and ADMIN can update any taxon
 *       - Hierarchy validation is enforced when updating rank or parentId
 *
 *       ### Notes:
 *       - Partial updates are allowed (only send fields you want to update)
 *       - Hierarchy rules must be respected:
 *         - parent must be a higher rank than the child
 *
 *     tags:
 *       - Taxons
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Taxon ID
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaxon'
 *
 *     responses:
 *       200:
 *         description: Taxon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Taxon'
 *
 *       404:
 *         description: Taxon not found
 *
 *       400:
 *         description: Validation error
 *
 *       403:
 *         description: You do not have sufficient permissions to perform this action
 *
 *       409:
 *         description: You are not the owner to do this action
 */
router.put('/:id', asyncHandler(verifyToken), validate(idParamSchema, "params"), asyncHandler(updateTaxon));

router.delete('/:id', asyncHandler(verifyToken), asyncHandler(deleteTaxon));

export default router
import { Router } from 'express';

import { verifyToken } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { validate } from '../middleware/validate.middleware.js';

import { createTaxonSchema, updateTaxonSchema } from '../schemas/taxon.schema.js';
import { createTaxon, deleteTaxon, getAllTaxons, getTaxonById, updateTaxaParent, updateTaxaStatus, updateTaxon } from '../controllers/taxon.controller.js';
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

/**
 * @swagger
 * /taxons/{id}:
 *   get:
 *     summary: Get a taxon by ID
 *     description: |
 *       Retrieves a single taxon by its ID.
 *
 *       ### Notes:
 *       - Requires authentication
 *       - Returns the taxon data if found
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
 *     responses:
 *       200:
 *         description: Taxon retrieved successfully
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
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.get('/:id', asyncHandler(verifyToken), validate(idParamSchema, "params"), asyncHandler(getTaxonById));

/**
 * @swagger
 * /taxons/{id}:
 *   put:
 *     summary: Update basic taxon information
 *     description: |
 *       Updates basic fields of an existing taxon.
 *
 *       ### Business rules:
 *       - Only the owner can update the taxon if the role is USER
 *       - USER can only update taxons with status PENDING
 *       - MODERATOR and ADMIN can update any taxon
 *
 *       ### Notes:
 *       - Partial updates are allowed (only send fields you want to update)
 *       - This endpoint ONLY updates:
 *         - name
 *         - description
 *         - rank
 *       - parentId and validationStatus are handled in separate endpoints
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
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Taxon updated successfully
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
 *         description: That taxon name already exists at this rank
 */
router.put('/:id', asyncHandler(verifyToken), validate(idParamSchema, "params"), validate(updateTaxonSchema), asyncHandler(updateTaxon));

/**
 * @swagger
 * /taxons/{id}:
 *   delete:
 *     summary: Soft delete a taxon
 *     description: |
 *       Performs a soft delete on a taxon by setting its deletedAt field.
 *
 *       ### Business rules:
 *       - USER can only delete their own taxons
 *       - USER can only delete taxons in PENDING status
 *       - ADMIN and MODERATOR can delete any taxon
 *       - A taxon cannot be deleted if it has children
 *
 *       ### Notes:
 *       - This does NOT permanently remove the taxon from the database
 *       - The taxon will be excluded from future queries
 *       - Requires authentication
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
 *     responses:
 *       200:
 *         description: Taxon soft deleted successfully
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
 *                       example: Taxon deleted successfully
 *
 *       400:
 *         description: Cannot delete a taxon that has children
 *
 *       403:
 *         description: |
 *           Forbidden:
 *           - You are not the owner of this taxon
 *           - You can only delete taxons in PENDING status
 *
 *       404:
 *         description: Taxon not found
 *
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.delete('/:id', asyncHandler(verifyToken), validate(idParamSchema, "params"), asyncHandler(deleteTaxon));

/**
 * @swagger
 * /taxons/{id}/status:
 *   patch:
 *     summary: Update taxon validation status
 *     description: |
 *       Updates the validation status of a taxon.
 *
 *       ### Notes:
 *       - Only ADMIN and MODERATOR can perform this action
 *       - This endpoint is currently in a preliminary (dummy) version
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
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *                 example: APPROVED
 *
 *     responses:
 *       200:
 *         description: Taxon status updated successfully
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
 *                       example: Taxon status updated successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden (only ADMIN or MODERATOR allowed)
 *
 *       404:
 *         description: Taxon not found
 */
router.patch('/:id/status', asyncHandler(verifyToken), verifyRole([Role.ADMIN, Role.MODERATOR]), validate(idParamSchema, "params"), asyncHandler(updateTaxaStatus));

/**
 * @swagger
 * /taxons/{id}/parent:
 *   patch:
 *     summary: Update taxon parent
 *     description: |
 *       Updates the parent of a taxon (hierarchy change).
 *
 *       ### Notes:
 *       - Only ADMIN and MODERATOR can perform this action
 *       - This endpoint is currently in a preliminary (dummy) version
 *       - Future versions will include hierarchy validation (no cycles, valid rank relationships)
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
 *             type: object
 *             properties:
 *               parentId:
 *                 type: integer
 *                 nullable: true
 *                 example: 2
 *                 description: New parent taxon ID (null for root)
 *
 *     responses:
 *       200:
 *         description: Taxon parent updated successfully
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
 *                       example: Taxon parent updated successfully
 *
 *       400:
 *         description: Invalid parent assignment (future validation)
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden (only ADMIN or MODERATOR allowed)
 *
 *       404:
 *         description: Taxon not found
 */
router.patch('/:id/parent', asyncHandler(verifyToken), verifyRole([Role.ADMIN, Role.MODERATOR]), validate(idParamSchema, "params"), asyncHandler(updateTaxaParent));


export default router
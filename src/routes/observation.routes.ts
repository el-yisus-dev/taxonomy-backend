import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { createObservationSchema, getObservationsMapSchemaRefined, updateObservationSchema } from "../schemas/observation.schema.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { createObservation, getAllObservations, getObservationsMap, updateObservation } from "../controllers/observation.controller.js";

/**
 * @swagger
 * tags:
 *   name: Observations
 *   description: Endpoints for managing Observations 
 */

const router = Router();

/**
 * @swagger
 * /observations:
 *   post:
 *     summary: Create a new observation
 *     description: |
 *       Creates a new observation representing a real-world event reported by a user.
 *
 *       ### Core concept:
 *       - An observation is a **raw fact**, not a scientific truth.
 *       - It does NOT contain taxonomic validation.
 *       - It only stores evidence (description, location, images).
 *
 *       ### Business rules:
 *       - observedAt is required and represents when the event happened (not upload time).
 *       - latitude must be between -90 and 90.
 *       - longitude must be between -180 and 180.
 *       - At least one of the following must be provided:
 *         - description
 *         - images
 *
 *       ### Images:
 *       - Images are uploaded externally (e.g. Cloudinary) and sent as URLs.
 *       - Each image must include:
 *         - url: valid public URL
 *         - providerId: optional identifier from provider
 *       - Multiple images are allowed to improve identification accuracy.
 *
 *       ### Notes:
 *       - Observations are neutral and do not imply any taxon.
 *       - Identification happens in a separate process.
 *
 *     tags:
 *       - Observations
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - observedAt
 *               - latitude
 *               - longitude
 *             properties:
 *               description:
 *                 type: string
 *                 nullable: true
 *                 example: Araña negra en el baño
 *
 *               observedAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-04-18T15:30:00.000Z
 *
 *               latitude:
 *                 type: number
 *                 minimum: -90
 *                 maximum: 90
 *                 example: 19.9
 *
 *               longitude:
 *                 type: number
 *                 minimum: -180
 *                 maximum: 180
 *                 example: -98.0
 *
 *               placeName:
 *                 type: string
 *                 nullable: true
 *                 example: Huauchinango, Puebla
 *
 *               images:
 *                 type: array
 *                 nullable: true
 *                 items:
 *                   type: object
 *                   required:
 *                     - url
 *                   properties:
 *                     url:
 *                       type: string
 *                       format: uri
 *                       example: https://res.cloudinary.com/demo/image/upload/sample.jpg
 *                     providerId:
 *                       type: string
 *                       nullable: true
 *                       example: sample
 *
 *     responses:
 *       201:
 *         description: Observation created successfully
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
 *                     observation:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         description:
 *                           type: string
 *                           nullable: true
 *                         observedAt:
 *                           type: string
 *                           format: date-time
 *                         latitude:
 *                           type: number
 *                         longitude:
 *                           type: number
 *                         placeName:
 *                           type: string
 *                           nullable: true
 *                         userId:
 *                           type: integer
 *                           example: 1
 *                         images:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               url:
 *                                 type: string
 *                               providerId:
 *                                 type: string
 *                                 nullable: true
 *
 *       400:
 *         description: |
 *           Validation error:
 *           - Missing required fields
 *           - Invalid latitude/longitude
 *           - Invalid image URL
 *           - Missing both description and images
 *
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *
 *       500:
 *         description: Internal server error
 */
router.post("/", asyncHandler(verifyToken), validate(createObservationSchema), asyncHandler(createObservation));

/**
 * @swagger
 * /observations:
 *   get:
 *     summary: Get all observations (paginated)
 *     description: |
 *       Retrieves a paginated list of observations.
 *
 *       ### Features:
 *       - Pagination using page and limit
 *       - Sorted by newest observations first
 *
 *       ### Notes:
 *       - This endpoint is NOT optimized for map rendering.
 *       - Use /observations/map for geospatial queries.
 *
 *     tags:
 *       - Observations
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of observations per page
 *
 *     responses:
 *       200:
 *         description: Observations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       description:
 *                         type: string
 *                         nullable: true
 *                       observedAt:
 *                         type: string
 *                         format: date-time
 *                       latitude:
 *                         type: number
 *                       longitude:
 *                         type: number
 *                       placeName:
 *                         type: string
 *                         nullable: true
 *                       userId:
 *                         type: integer
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             url:
 *                               type: string
 *                             providerId:
 *                               type: string
 *                               nullable: true
 *
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 20
 *                     total:
 *                       type: integer
 *                       example: 120
 *                     totalPages:
 *                       type: integer
 *                       example: 6
 *
 *       400:
 *         description: Invalid query parameters
 *
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *
 *       500:
 *         description: Internal server error
 */
router.get("/", asyncHandler(verifyToken), asyncHandler(getAllObservations));

/**
 * @swagger
 * /observations/map:
 *   get:
 *     summary: Get observations for map viewport
 *     description: |
 *       Retrieves observations within a geographic bounding box.
 *
 *       ### Core concept:
 *       - This endpoint is optimized for map rendering.
 *       - It returns lightweight data for performance.
 *
 *       ### Bounding box:
 *       - Defined by southwest (sw) and northeast (ne) coordinates.
 *       - Must form a valid rectangle:
 *         - swLat < neLat
 *         - swLng < neLng
 *
 *       ### Performance rules:
 *       - Maximum 500 results per request.
 *       - Only minimal fields are returned.
 *       - Only 1 image per observation is included.
 *
 *       ### Notes:
 *       - Use this endpoint for maps, not listings.
 *
 *     tags:
 *       - Observations
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: swLat
 *         required: true
 *         schema:
 *           type: number
 *           example: 19.0
 *
 *       - in: query
 *         name: swLng
 *         required: true
 *         schema:
 *           type: number
 *           example: -99.0
 *
 *       - in: query
 *         name: neLat
 *         required: true
 *         schema:
 *           type: number
 *           example: 21.0
 *
 *       - in: query
 *         name: neLng
 *         required: true
 *         schema:
 *           type: number
 *           example: -97.0
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *           maximum: 500
 *           default: 200
 *
 *     responses:
 *       200:
 *         description: Observations retrieved successfully
 *
 *       400:
 *         description: Invalid bounding box or parameters
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.get("/map", asyncHandler(verifyToken), validate(getObservationsMapSchemaRefined, "query"),
  asyncHandler(getObservationsMap)
);

/**
 * @swagger
 * /observations/{id}:
 *   patch:
 *     summary: Update an observation
 *     description: |
 *       Updates editable fields of an observation.
 *
 *       ### Editable fields:
 *       - description
 *       - placeName
 *
 *       ### Restrictions:
 *       - Only the owner can update the observation.
 *       - Location and observedAt are immutable.
 *
 *       ### Notes:
 *       - This endpoint performs a partial update.
 *       - At least one field must be provided.
 *
 *     tags:
 *       - Observations
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *               description:
 *                 type: string
 *               placeName:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Observation updated successfully
 *
 *       400:
 *         description: Validation error
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Observation not found
 *
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", asyncHandler(verifyToken), validate(updateObservationSchema), asyncHandler(updateObservation));

export default router;
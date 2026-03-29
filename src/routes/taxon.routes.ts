import { Router } from 'express';

import { verifyToken } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { validate } from '../middleware/validate.middleware.js';

import { createTaxonSchema } from '../schemas/taxon.schema.js';
import { createTaxon } from '../controllers/taxon.controller.js';

const router = Router();

router.post('/', asyncHandler(verifyToken), validate(createTaxonSchema), asyncHandler(createTaxon))

export default router
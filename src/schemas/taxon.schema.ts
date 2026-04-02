import { z } from 'zod'
import { hierarchy } from '../types/Taxon.js'

export const createTaxonSchema = z.object({
  name: z
    .string({ error: 'The name is required' })
    .trim()
    .min(1, { error: 'The name cannot be empty' }),

  rank: z.enum(hierarchy, {
    error: 'The rank is required'
  }),

  parentId: z
    .coerce.number({ error: 'Parent ID must be a number' })
    .int({ error: 'Parent ID must be an integer' })
    .positive({ error: 'Parent ID must be positive' })
    .optional(),

  description: z
    .string({ error: 'Description must be a string' })
    .trim()
    .min(1, { error: 'Description cannot be empty' })
    .optional()
})
import * as taxonRepository from '../repositories/taxon.repository.js';
import { hierarchy, type CreateTaxonDTO } from '../types/Taxon.js';
import { ApiError } from '../utils/ApiError.js';

export const createTaxon = async (
  data: CreateTaxonDTO,
  userId: number
) => {
  const { name, rank, parentId, description } = data

  let parent = null

  // 🌳 validar parent
  if (parentId) {
    parent = await taxonRepository.findById(parentId)

    if (!parent) {
      throw new ApiError(404, 'Parent taxon not found')
    }

    const parentLevel = hierarchy.indexOf(parent.rank)
    const childLevel = hierarchy.indexOf(rank)

    if (parentLevel === -1 || childLevel === -1) {
      throw new ApiError(400, 'Invalid hierarchy')
    }

    if (parentLevel >= childLevel) {
      throw new ApiError(
        400,
        `Invalid hierarchy: ${rank} cannot be child of ${parent.rank}`
      )
    }
  } else {
    if (rank !== 'DOMAIN') {
      throw new ApiError(400, `${rank} must have a parent`)
    }
  }

  const newTaxon = await taxonRepository.createTaxon({
    name,
    rank,
    parentId: parentId || null,
    description: description ?? null,
    createdBy: userId,
  })

  return newTaxon
}
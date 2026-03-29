import { taxonRepository } from '../repositories/taxon.repository'
import { ApiError } from '../utils/ApiError'

const hierarchy = [
  'DOMAIN',
  'KINGDOM',
  'PHYLUM',
  'CLASS',
  'ORDER',
  'FAMILY',
  'GENUS',
  'SPECIES'
] as const

export const taxonService = {
  async create(data: any, userId: number) {
    const { name, rank, parentId, description } = data

    let parent = null

    // 🌳 validar parent
    if (parentId) {
      parent = await taxonRepository.findById(parentId)

      if (!parent) {
        throw new ApiError(404, 'Parent taxon not found')
      }

      // 🧬 validar jerarquía
      const parentLevel = hierarchy.indexOf(parent.rank)
      const childLevel = hierarchy.indexOf(rank)

      if (parentLevel >= childLevel) {
        throw new ApiError(
          400,
          `Invalid hierarchy: ${rank} cannot be child of ${parent.rank}`
        )
      }
    }

    try {
      return await taxonRepository.create({
        name,
        rank,
        parentId: parentId || null,
        description,
        createdBy: userId
      })
    } catch (error: any) {
      // 💥 unique constraint
      if (error.code === 'P2002') {
        throw new ApiError(
          400,
          'A taxon with this name and rank already exists'
        )
      }

      throw error
    }
  }
}
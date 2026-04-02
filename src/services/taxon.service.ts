import * as taxonRepository from '../repositories/taxon.repository.js';
import { hierarchy, type CreateTaxonDTO } from '../types/Taxon.js';
import { ApiError } from '../utils/ApiError.js';
import { getTotalPages } from '../utils/Pagination.js';

export const createTaxon = async (
  data: CreateTaxonDTO,
  userId: number
) => {
  const { name, rank, parentId, description } = data
  let parent = null

  if (parentId && rank === hierarchy[0]) {
      throw new ApiError(400, `ParentId isn't necesary when you have a Domain`);
  }

  if (parentId !== undefined) {
    parent = await taxonRepository.findById(parentId as number)
    if (!parent) {
      throw new ApiError(404, 'Parent taxon not found')
    }

    const parentLevel = hierarchy.indexOf(parent.rank)
    const childLevel = hierarchy.indexOf(rank)

    if (parentLevel === -1 || childLevel === -1) {
      throw new ApiError(500, 'Hierarchy configuration error')
    }

    if (parentLevel >= childLevel) {
      throw new ApiError(
        400,
        `Invalid hierarchy: ${rank} cannot be child of ${parent.rank}`
      )
    }
  } 

  const existTaxon = await taxonRepository.isExist(name.toLowerCase(), rank);
  

  if (existTaxon !== null) {
      throw new ApiError(409, 'Taxon already exists at this rank')
  }

  return await taxonRepository.createTaxon({
    name: name.toLowerCase(),
    rank,
    parentId: parentId ?? null,
    description: description ?? null,
    createdBy: userId,
  })
}

export const getAllTaxons = async ({
  page,
  limit,
  skip,
  parentId,
  includeCreator
}: {
  page: number
  limit: number
  skip: number
  parentId: number | null | undefined
  includeCreator?: boolean

}) => {

  const [taxons, total] = await Promise.all([
    taxonRepository.findAllTaxons({ skip, limit, parentId, includeCreator }),
    taxonRepository.countTaxons({ parentId })
  ])

  const totalPages = getTotalPages(total, limit);

  return {
    items: taxons,
    meta: {
      page,
      limit,
      total,
      totalPages
    }
  }
};
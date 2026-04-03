import { Role } from '@prisma/client';
import * as taxonRepository from '../repositories/taxon.repository.js';
import { hierarchy, TaxaStatus, type CreateTaxonDTO, type UpdateTaxonDTO } from '../types/Taxon.js';
import { ApiError } from '../utils/ApiError.js';
import { getTotalPages } from '../utils/Pagination.js';
import { validateHierarchy } from '../lib/validateHierarchy.js';

export const createTaxon = async (
  data: CreateTaxonDTO,
  userId: number
) => {
  const { name, rank, parentId, description } = data
  let parent = null

  if (parentId && rank === hierarchy[0]) {
      throw new ApiError(400, `ParentId isn't necesary when you have a Domain`);
  }

  await validateHierarchy(rank, parentId);

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
    // @ts-ignore
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

export const updateTaxon = async (
  id: number,
  data: UpdateTaxonDTO,
  userLocals: any
) => {
  const { role, id: userId } = userLocals;
  
  const taxa = await taxonRepository.findTaxonById(id);

  if (!taxa) {
    throw new ApiError(404, `Taxa not found.`);
  }

  const isOwner = taxa.createdBy === userId;
  const isPrivileged = role === Role.MODERATOR || role === Role.ADMIN;

  // 🔒 USER rules
  if (role === Role.USER) {
    if (!isOwner) {
      throw new ApiError(
        403,
        `You are not the owner to do this action.`
      );
    }

    if (taxa.validationStatus !== TaxaStatus.PENDING) {
      throw new ApiError(
        403,
        `You can only edit taxa in PENDING status.`
      );
    }
  }

  if (data.rank || data.parentId !== undefined) {
    const newRank = data.rank ?? taxa.rank;
    const newParentId = data.parentId ?? taxa.parentId;

    await validateHierarchy(newRank, newParentId);
  }

  const updatedTaxon = await taxonRepository.updateTaxon(id, data);

  return updatedTaxon;
};
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
  
  if (rank === hierarchy[0] && parentId != null) {
    throw new ApiError(400, "DOMAIN cannot have a parent");
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
  const { rank, name, description } = data;
  
  const taxa = await taxonRepository.findTaxonById(id);
  
  if (!taxa) {
    throw new ApiError(404, `Taxa not found.`);
  }

  const isOwner = taxa.createdBy === userId;
  

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
    
  const newtaxaName = data.name ? data.name.toLowerCase() : taxa.name;
  const newtaxaRank = data.rank ? data.rank : taxa.rank;

    
  const existTaxon = await taxonRepository.isExist(newtaxaName, newtaxaRank);
  
  if (existTaxon !== null) {
      throw new ApiError(409, 'That Taxon name already exists at this rank')
  }

 const updatedTaxon = await taxonRepository.updateTaxon(id, {
    ...(name !== undefined && { name: name?.toLowerCase() }),  
    ...(rank !== undefined && { rank }),  
    ...(description !== undefined && { description }),  
  });

  return updatedTaxon;
};

export const getTaxonById = async (id: number) => {
  const taxa = await taxonRepository.findById(id);

  if (!taxa) {
    throw new ApiError(404, "Taxa not found.");
  }

  return taxa;

}

export const deleteTaxa = async (id: number, user: any) => {
  
  const { userId, role } = user;

  const existinTaxa = await taxonRepository.findTaxonById(id);

  if (!existinTaxa) {
    throw new ApiError(404, "Taxa not found");
  }

  const isOwner = existinTaxa.createdBy === userId;

  if (role === Role.USER) {
    if (!isOwner) {
      throw new ApiError(403, `You are not the owner to do this action.`);
    }

    if (existinTaxa.validationStatus !== TaxaStatus.PENDING) {
      throw new ApiError(
        403,
        `You can only delete taxa in PENDING status.`
      );
    }
  }
        
  
  const hasChildren = await taxonRepository.hasChildren(id);

  if (hasChildren) {
    throw new ApiError(
      400,
      "Cannot delete a taxon that has children."
    );
  }
  
  return taxonRepository.softDeleteTaxa(id);
}

export const updateTaxaStatus = async (
  id: number,
  data: { status: TaxaStatus }
) => {
  const taxa = await taxonRepository.findById(id);

  if (!taxa) {
    throw new ApiError(404, "Taxa not found.");
  }

  if (taxa.validationStatus !== TaxaStatus.PENDING) {
    throw new ApiError(
      409,
      "Only PENDING taxa can be updated"
    );
  }

  const { status } = data;

  return await taxonRepository.updateTaxonKeyInfo(id, { status });
};

export const updateTaxaParent = async (id: number, data: { parentId: number }) => {
  
  const { parentId } = data;
  const taxa = await taxonRepository.findById(id);
  
  if (!taxa) {
    throw new ApiError(404, "Taxa not found.");
  }

  if (taxa.validationStatus !== TaxaStatus.PENDING) {
    throw new ApiError(409, "Cannot modify a non-pending taxon");
  }

  
  if (parentId === taxa.id) {
    throw new ApiError(400, "A taxon cannot be its own parent");
  }
  
  await validateHierarchy(taxa.rank, parentId);

  return await taxonRepository.updateTaxonKeyInfo(id, { parentId });
};
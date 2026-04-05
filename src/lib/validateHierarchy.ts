import * as taxonRepository from '../repositories/taxon.repository.js';
import { hierarchy, type TaxonRank } from "../types/Taxon.js";
import { ApiError } from "../utils/ApiError.js";

export const validateHierarchy = async (
  rank: TaxonRank,
  parentId?: number | null
) => {
  const childLevel = hierarchy.indexOf(rank);

  if (childLevel === -1) {
    throw new ApiError(500, "Hierarchy configuration error");
  }

  if (parentId == null) {
    return;
  }

  const parent = await taxonRepository.findById(parentId);

  if (!parent) {
    throw new ApiError(404, "Parent taxon not found");
  }

  const parentLevel = hierarchy.indexOf(parent.rank);

  if (parentLevel !== childLevel - 1) {
    throw new ApiError(
      400,
      `Invalid hierarchy: ${rank} must have a parent of rank ${hierarchy[childLevel - 1]}`
    );
  }
};
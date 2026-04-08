import { ApiError } from "../utils/ApiError.js";

export const validateNoCycles = async (
  taxonId: number,
  parentId: number
) => {
  let current = await taxonRepository.findById(parentId);

  while (current) {
    if (current.id === taxonId) {
      throw new ApiError(400, "Cyclic relationship detected");
    }

    if (!current.parentId) break;

    current = await taxonRepository.findById(current.parentId);
  }
};
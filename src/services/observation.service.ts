import * as observationRepository from "../repositories/observation.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { getTotalPages } from "../utils/Pagination.js";

export const createObservationService = async (input: any, userId: number) => {
  const {
    description,
    observedAt,
    latitude,
    longitude,
    placeName,
    images
  } = input;

  return await observationRepository.createObservation({
    userId,
    description,
    observedAt: new Date(observedAt),
    latitude,
    longitude,
    placeName,
    images: {
      create: (images || []).map((img: any) => ({
        url: img.url,
        providerId: img.providerId
      }))
    }
  });
};

export const getAllObservations = async ({ page, limit, skip }: any) => {  const [observations, total] = await Promise.all([
    observationRepository.findAllObservations({ skip, limit }),
    observationRepository.countObservations(),
  ])

  const totalPages = getTotalPages(total, limit);

  return {
    items: observations,
    meta: {
      page,
      limit,
      total,
      totalPages
    }
  }
}

export const getObservationsMap = async ({
  swLat,
  swLng,
  neLat,
  neLng,
  limit
}: any) => {

  const safeLimit = Math.min(limit || 200, 500);

  return await observationRepository.findObservationsInArea({
    swLat,
    swLng,
    neLat,
    neLng,
    limit: safeLimit
  });
};

export const updateObservation = async (id: number, input: any, userId: number) => {
  const existing = await observationRepository.findById(id);

  if (!existing) {
    throw new ApiError(404, "Observation not found");
  }

  if (existing.userId !== userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const data: any = {};

  if (input.description !== undefined) {
    data.description = input.description;
  }

  if (input.placeName !== undefined) {
    data.placeName = input.placeName;
  }

  return await observationRepository.updateObservation(id, data);
};
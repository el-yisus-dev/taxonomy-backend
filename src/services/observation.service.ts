import * as observationRepository from "../repositories/observation.repository.js";
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
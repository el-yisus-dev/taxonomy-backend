import { prisma } from "../lib/prisma.js";

export const createObservation = (data: any) => {
  return prisma.observation.create({
    data,
    include: {
      images: true
    }
  });
};

export const getObservationsInArea = (filters: any) => {
  const { swLat, swLng, neLat, neLng } = filters;

  return prisma.observation.findMany({
    where: {
      latitude: { gte: swLat, lte: neLat },
      longitude: { gte: swLng, lte: neLng }
    },
    take: 300,
    include: {
      images: true
    }
  });
};

export const findAllObservations = ({ skip, limit }: { skip: number; limit: number }) => {
  return prisma.observation.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc"
    },
    include: {
      images: true
    }
  });
};

export const countObservations = () => {
  return prisma.observation.count();
};

export const findObservationsInArea = ({
  swLat,
  swLng,
  neLat,
  neLng,
  limit
}: any) => {
  return prisma.observation.findMany({
    where: {
      latitude: {
        gte: swLat,
        lte: neLat
      },
      longitude: {
        gte: swLng,
        lte: neLng
      }
    },
    take: limit,
    orderBy: {
      observedAt: "desc"
    },
    select: {
      id: true,
      latitude: true,
      longitude: true,
      observedAt: true,

      images: {
        take: 1,
        select: {
          url: true
        }
      }
    }
  });
};
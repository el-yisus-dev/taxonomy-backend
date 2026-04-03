import { prisma } from "../lib/prisma.js"
import type { TaxonRank, UpdateTaxonDTO } from "../types/Taxon.js"


export const createTaxon = async (data: {
  name: string,
  rank: TaxonRank,
  parentId?: number | null
  description?: string | null,
  createdBy: number,
}) => {
    
    return prisma.taxon.create({
      data
    })

}

export const findById = async (id: number) => {
  return prisma.taxon.findFirst({
    where: {
      id,
      deletedAt: null
    }
  })
}

export const findTaxonById = async (id: number) => {
  return await prisma.taxon.findUnique({
    where: { 
      id,
      deletedAt: null
    }
  })
};

export const isExist = async (name: string, rank: TaxonRank) => {
  
  return  prisma.taxon.findFirst({
     where: {
       name,
       rank,
     }
   })
};

export const findAllTaxons = async ({
  skip,
  limit,
  parentId,
  includeCreator
}: {
  skip: number
  limit: number
  parentId: number | null | undefined
  includeCreator?: boolean
}) => {

  return prisma.taxon.findMany({
    where: {
      deletedAt: null,
      ...(parentId !== undefined && { parentId })
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      name: true,
      rank: true,
      parentId: true,
      updatedAt: true,
      description: true,
      validationStatus: true,

      ...(includeCreator && {
        creator: {
          select: {
            username: true,
            name: true,
            lastName: true
          }
        }
      })
    }
  })
};

export const countTaxons = async ({
  parentId
}: {
  parentId: number | null | undefined
}) => {
  return prisma.taxon.count({
    where: {
      deletedAt: null,
      ...(parentId !== undefined && { parentId })
    }
  })
};

export const updateTaxon = async (id: number, data: UpdateTaxonDTO) => {
  return await prisma.taxon.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.rank !== undefined && { rank: data.rank }),
      ...(data.parentId !== undefined && { parentId: data.parentId }),
      ...(data.description !== undefined && { description: data.description }),
    },
  });
};